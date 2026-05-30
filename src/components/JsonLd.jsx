import { useEffect } from "react";

/**
 * Injects a JSON-LD <script> into <head> for the current page and removes it
 * on unmount. Each instance is keyed by a stable `id` so route changes swap
 * the structured data cleanly (important for an SPA).
 */
const JsonLd = ({ id, data }) => {
  useEffect(() => {
    if (!data) return undefined;

    const scriptId = `ld-${id}`;
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = scriptId;
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [id, data]);

  return null;
};

export default JsonLd;
