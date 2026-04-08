import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardShell, PrimaryButton } from "../components/DashboardShell";
import { CatalogFilters } from "../components/CatalogFilters";
import { ProductCard } from "../components/ProductCard";
import { listProducts, deleteProduct, updateProduct } from "../api/products";
import { listCategories, createCategory } from "../api/categories";
import { useApiResource } from "../hooks/useApiResource";
import Modal from "../components/Modal";
import { ProductForm } from "../components/ProductForm";

export default function ProductCatalog() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryModal, setCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [catError, setCatError] = useState("");
  const { data, loading, error } = useApiResource(
    () => listProducts({ search }),
    [search]
  );

  useEffect(() => {
    listCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const products = data?.data ?? [];
  const categoryNames = useMemo(() => {
    const fromProducts = products
      .map((p) => p.Type)
      .filter(Boolean);
    const fromState = categories.map((c) => c.name);
    return Array.from(new Set([...fromState, ...fromProducts]));
  }, [products, categories]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = category ? p.Type === category : true;
      const matchSearch = search
        ? p.title?.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchCategory && matchSearch;
    });
  }, [products, category, search]);

  const handleDelete = async (product) => {
    const confirm = window.confirm(
      `Delete "${product.title}"? This action cannot be undone.`
    );
    if (!confirm) return;
    try {
      await deleteProduct(product._id);
      window.location.reload(); // simple refresh to reflect deletion
    } catch (err) {
      alert(`Failed to delete: ${err.message}`);
    }
  };

  const handleQuickEdit = (product) => {
    setSelected(product);
    setErrorMsg("");
  };

  const handleUpdate = async (payload) => {
    if (!selected?._id) return;
    setSaving(true);
    setErrorMsg("");
    try {
      await updateProduct(selected._id, payload);
      setSelected(null);
      window.location.reload();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardShell
      title="Product Catalog"
      subtitle="Manage your handcrafted atelier collection"
      actions={
        <PrimaryButton icon="add" onClick={() => navigate("/dashboard/products/new")}>
          Add New Product
        </PrimaryButton>
      }
    >
      <CatalogFilters
        categories={categoryNames}
        activeCategory={category}
        onCategoryChange={setCategory}
        search={search}
        onSearch={setSearch}
      />

      {loading ? (
        <div className="text-[#44483d]">Loading products...</div>
      ) : error ? (
        <div className="text-[#ba1a1a]">
          Failed to load products: {error.message}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtered.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onQuickEdit={handleQuickEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={`Edit ${selected?.title || ""}`}
      >
        {errorMsg && (
          <div className="mb-4 bg-[#ffdad6] text-[#93000a] px-3 py-2 rounded-lg text-sm">
            {errorMsg}
          </div>
        )}
        <ProductForm
          initialValues={{
            title: selected?.title,
            category: selected?.Type,
            price: selected?.price,
            description: selected?.description,
            main: selected?.main,
            gallery: [
              selected?.sideimg1,
              selected?.sideimg2,
              selected?.sideimg3,
              selected?.sideimg4,
            ].filter(Boolean),
            occasion: selected?.Occasion,
            material: selected?.Material,
            colour: selected?.Colour,
            dimensions: selected?.Dimensions,
            pages: selected?.Pages,
            print: selected?.Print,
          }}
          onSubmit={handleUpdate}
          onSaveDraft={() => {}}
          loading={saving}
          categories={categories}
          onAddCategory={() => setCategoryModal(true)}
        />
      </Modal>

      <Modal
        open={categoryModal}
        onClose={() => setCategoryModal(false)}
        title="Add Category"
      >
        {catError && (
          <div className="mb-3 bg-[#ffdad6] text-[#93000a] px-3 py-2 rounded-lg text-sm">
            {catError}
          </div>
        )}
        <div className="space-y-3">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category name"
            className="w-full border border-[#c4c8b9] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#385419]/30"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setCategoryModal(false)}
              className="px-4 py-2 rounded-lg border border-[#c4c8b9] text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={async () => {
                if (!newCategory.trim()) {
                  setCatError("Category name is required");
                  return;
                }
                try {
                  setCatError("");
                  await createCategory(newCategory.trim());
                  const updated = await listCategories();
                  setCategories(updated);
                  setNewCategory("");
                  setCategoryModal(false);
                } catch (err) {
                  setCatError(err.message);
                }
              }}
              className="px-4 py-2 rounded-lg bg-[#385419] text-white text-sm font-semibold"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </DashboardShell>
  );
}
