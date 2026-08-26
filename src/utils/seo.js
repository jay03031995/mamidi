import { SITE_URL } from "../constants/site";
import { getImageUrls } from "./productImages";
import { getProductPath } from "./productLinks";
import { hasPrice, isSoldOutProduct } from "../data/shopCatalog";

const absolute = (path = "") =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

/**
 * BreadcrumbList structured data from [{ name, path }] crumbs.
 */
export const breadcrumbSchema = (crumbs = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absolute(crumb.path || "/"),
  })),
});

/**
 * Product structured data — powers rich product results / product rank.
 */
export const productSchema = (product) => {
  if (!product) return null;

  const images = getImageUrls(
    product.main || product.img,
    ...(Array.isArray(product.sideImages) ? product.sideImages : [])
  );

  const category =
    typeof product.category === "string"
      ? product.category
      : product.Type || product.type || undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || undefined,
    image: images.length ? images : undefined,
    sku: product._id || undefined,
    category,
    brand: { "@type": "Brand", name: "Mamidi" },
    url: absolute(getProductPath(product)),
  };

  if (hasPrice(product)) {
    const soldOut = isSoldOutProduct(product);
    schema.offers = {
      "@type": "Offer",
      url: absolute(getProductPath(product)),
      priceCurrency: "INR",
      price: Number(product.price),
      availability: soldOut
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Mamidi" },
    };
  }

  return schema;
};
