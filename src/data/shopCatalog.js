import { slugifyTitle } from "../utils/productLinks";
import { getImageUrl } from "../utils/productImages";

export const hasPrice = (product) =>
  product.price !== undefined && product.price !== null && product.price !== "";

export const getProductStock = (product = {}) => {
  if (product.stock === undefined || product.stock === null || product.stock === "") {
    return null;
  }

  const stock = Number(product.stock);
  return Number.isFinite(stock) ? Math.max(0, Math.floor(stock)) : null;
};

const truthyAvailabilityValue = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value !== "string") return false;

  return ["true", "1", "yes", "sold", "sold out", "sold_out", "out of stock", "out_of_stock"].includes(
    value.trim().toLowerCase()
  );
};

const falseyAvailabilityValue = (value) => {
  if (typeof value === "boolean") return value === false;
  if (typeof value === "number") return value === 0;
  if (typeof value !== "string") return false;

  return ["false", "0", "no", "unavailable"].includes(value.trim().toLowerCase());
};

export const isSoldOutProduct = (product = {}) =>
  getProductStock(product) === 0 ||
  truthyAvailabilityValue(product.isSoldOut) ||
  truthyAvailabilityValue(product.soldOut) ||
  truthyAvailabilityValue(product.sold) ||
  truthyAvailabilityValue(product.outOfStock) ||
  ["sold", "sold out", "sold_out", "out of stock", "out_of_stock", "unavailable"].includes(
    (product.availability || product.status || product.stockStatus || "")
      .toString()
      .trim()
      .toLowerCase()
  );

const isExplicitlyUnpurchasable = (product = {}) =>
  falseyAvailabilityValue(product.isPurchasable) ||
  falseyAvailabilityValue(product.purchasable);

const getCategoryName = (product) => {
  const category = product.category || product.Category || product.Type || product.type || "";

  return typeof category === "string" ? category : category.name || "";
};

export const SHOP_CATEGORIES = [
  {
    id: "calendars",
    label: "Calendars",
    aliases: ["calendar", "calendars", "calender", "calenders"],
    eyebrow: "A year told in art",
    description:
      "Power of Brightness, Insights of Creativity, and Beauty in Creatures live here with every new calendar you add from the dashboard.",
    emptyText: "Calendar pieces added from the dashboard will appear here.",
    products: [],
  },
  {
    id: "custom-products",
    label: "Custom Products",
    aliases: [
      "custom-product",
      "custom-products",
      "custom product",
      "custom products",
      "custom product's",
      "custom-product-s",
    ],
    eyebrow: "Your title, carried through",
    description:
      "The title will be printed on the cover page and on every single page as per requirement.",
    emptyText: "Custom products added from the dashboard will appear here.",
    products: [],
  },
];

export const formatProductPrice = (product) => {
  if (hasPrice(product)) return `₹${product.price}`;
  return product.priceLabel || "Made to order";
};

export const isPurchasableProduct = (product) =>
  !isExplicitlyUnpurchasable(product) &&
  !isSoldOutProduct(product) &&
  hasPrice(product);

export const groupProductsByCategory = (apiProducts = []) =>
  SHOP_CATEGORIES.map((category) => {
    const aliases = category.aliases.map(slugifyTitle);

    return {
      ...category,
      products: apiProducts
        .filter((product) =>
          aliases.includes(slugifyTitle(getCategoryName(product)))
        )
        .map((product) => ({
          ...product,
          category: category.label,
          categoryId: category.id,
          img: getImageUrl(product.img || product.main),
        })),
    };
  });
