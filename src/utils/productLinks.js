export const slugifyTitle = (title = "") =>
  title
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getProductPath = (product = {}) => {
  const slug = slugifyTitle(product.title || product.name || product._id);

  return slug ? `/product/${slug}` : "/shop";
};
