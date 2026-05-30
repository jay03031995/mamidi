/**
 * Static prerender for the Mamidi SPA.
 *
 * After `vite build`, this serves the built `dist/` with `vite preview`, then
 * uses headless Chrome to render each public route (including every product
 * page) and writes the fully-rendered HTML — title, meta, and JSON-LD included
 * — back into `dist/<route>/index.html`. Crawlers that don't run JS (most AI
 * bots, some search engines) then get complete markup in the initial response,
 * while real users still boot the live SPA.
 *
 * Usage:  npm run build && npm run prerender
 * Env:    VITE_API_BASE_URL  (product list source, default http://localhost:5050/api)
 *         CHROME_PATH        (override Chrome binary)
 *         PRERENDER_ORIGIN   (override preview origin)
 */
import { spawn, execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const PORT = 4178;
const ORIGIN = process.env.PRERENDER_ORIGIN || `http://localhost:${PORT}`;
const API = (process.env.VITE_API_BASE_URL || "http://localhost:5050/api").replace(/\/+$/, "");
const DIST = resolve("dist");

const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// "/" is rendered LAST because writing dist/index.html overwrites the SPA
// fallback that preview serves for every other route.
const STATIC_ROUTES = ["/shop", "/about", "/contact", "/faq"];

const slugifyTitle = (title = "") =>
  title
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      /* not up yet */
    }
    await sleep(250);
  }
  throw new Error(`Preview server never became ready at ${url}`);
}

async function getProductRoutes() {
  try {
    const res = await fetch(`${API}/products?limit=200`);
    const json = await res.json();
    const slugs = (json.data || [])
      .map((p) => slugifyTitle(p.title || p.name || p._id))
      .filter(Boolean);
    return [...new Set(slugs)].map((slug) => `/product/${slug}`);
  } catch (err) {
    console.warn(`⚠️  Could not fetch products for prerender (${err.message}). Prerendering static routes only.`);
    return [];
  }
}

function renderRoute(route) {
  const html = execFileSync(
    CHROME,
    [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      "--virtual-time-budget=9000",
      "--run-all-compositor-stages-before-draw",
      "--dump-dom",
      `${ORIGIN}${route}`,
    ],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }
  );

  const doc = html.trim().startsWith("<!DOCTYPE")
    ? html
    : `<!DOCTYPE html>\n${html}`;

  const outPath =
    route === "/" ? join(DIST, "index.html") : join(DIST, route, "index.html");

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, doc, "utf8");
  return outPath;
}

async function main() {
  const preview = spawn(
    "npx",
    ["vite", "preview", "--port", String(PORT), "--strictPort"],
    { stdio: "ignore" }
  );

  try {
    await waitForServer(ORIGIN);

    const routes = [...STATIC_ROUTES, ...(await getProductRoutes()), "/"];
    console.log(`Prerendering ${routes.length} routes…`);

    for (const route of routes) {
      try {
        const out = renderRoute(route);
        console.log(`  ✓ ${route}  →  ${out.replace(`${DIST}/`, "dist/")}`);
      } catch (err) {
        console.error(`  ✗ ${route}  (${err.message})`);
      }
    }

    console.log("✅ Prerender complete.");
  } finally {
    preview.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
