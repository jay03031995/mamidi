const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ||
  "https://mamidi-backend-qyso.onrender.com/api";

const CATEGORY_META = [
  {
    match: ["calendar", "calender"],
    eyebrow: "A year told in art",
    description:
      "Illustrated calendars designed to bring creativity and warmth into every month.",
  },
  {
    match: ["jute", "bag"],
    eyebrow: "Carry Style",
    description:
      "Functional pieces with earthy textures, handcrafted details, and everyday charm.",
  },
  {
    match: ["pouch"],
    eyebrow: "Essentials",
    description:
      "Compact artful pouches crafted to carry your little stories wherever you go.",
  },
  {
    match: ["game"],
    eyebrow: "Play & Bond",
    description:
      "Thoughtfully designed games that spark joy, creativity, and connection.",
  },
  {
    match: ["story", "custom"],
    eyebrow: "Personalized",
    description:
      "Create something truly yours with custom-made products crafted around your story.",
  },
  {
    match: ["coaster", "tea"],
    eyebrow: "Home Accents",
    description:
      "Artful home pieces that add warmth and charm to everyday rituals.",
  },
];

export const normalizeCategory = (value) =>
  value?.toString().trim().toLowerCase() || "";

export const getCategoryMeta = (name) => {
  const normalized = normalizeCategory(name);

  return (
    CATEGORY_META.find((item) =>
      item.match.some((word) => normalized.includes(word))
    ) || {
      eyebrow: "Mamidi Collection",
      description:
        "Small-batch pieces, thoughtful gifting, and handcrafted details made to feel personal.",
    }
  );
};

const getProductCategory = (product) =>
  normalizeCategory(product.category || product.Category || product.Type || product.type);

async function getJson(path) {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

export async function fetchCatalog({ limit = 100 } = {}) {
  const [categoryData, productData] = await Promise.all([
    getJson("/categories"),
    getJson(`/products?limit=${limit}`),
  ]);

  const categoryList = Array.isArray(categoryData.data) ? categoryData.data : [];
  const products = Array.isArray(productData.data) ? productData.data : [];

  const mappedCategories = categoryList.map((category) => {
    const name = category.name || category.label || "Category";
    const key = normalizeCategory(name);
    const meta = getCategoryMeta(name);
    const categoryProducts = products
      .filter((product) => getProductCategory(product) === key)
      .map((product) => ({
        ...product,
        category: name,
        categoryId: category._id || category.slug || key,
      }));

    return {
      id: category._id || category.slug || key,
      slug: category.slug || key.replace(/\s+/g, "-"),
      label: name,
      eyebrow: meta.eyebrow,
      description: meta.description,
      products: categoryProducts,
      emptyText: "No products yet",
    };
  });

  return { categories: mappedCategories, products };
}
