import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardShell, PrimaryButton } from "../components/DashboardShell";
import { CatalogFilters } from "../components/CatalogFilters";
import { ProductCard } from "../components/ProductCard";
import { listAllProducts, deleteProduct, updateProduct } from "../api/products";
import { listCategories, createCategory, updateCategory, deleteCategory } from "../api/categories";
import { useApiResource } from "../hooks/useApiResource";
import Modal from "../components/Modal";
import { ProductForm } from "../components/ProductForm";
import { Trash2, Edit2 } from "lucide-react";

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
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const { data, loading, error } = useApiResource(
    () => listAllProducts({ search }),
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
      window.location.reload();
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

  const openCategoryModal = () => {
    setEditingCategory(null);
    setNewCategory("");
    setCatError("");
    setCategoryModal(true);
  };

  const openEditCategory = (cat) => {
    setEditingCategory(cat);
    setNewCategory(cat.name);
    setCatError("");
    setCategoryModal(true);
  };

  const handleSaveCategory = async () => {
    if (!newCategory.trim()) {
      setCatError("Category name is required");
      return;
    }

    try {
      setCatError("");
      setSaving(true);

      if (editingCategory) {
        await updateCategory(editingCategory._id, newCategory.trim());
      } else {
        await createCategory(newCategory.trim());
      }

      const updated = await listCategories();
      setCategories(updated);
      setNewCategory("");
      setEditingCategory(null);
      setCategoryModal(false);
    } catch (err) {
      setCatError(err.message || "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (cat) => {
    if (!window.confirm(`Delete "${cat.name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setCatError("");
      setDeleting(true);
      await deleteCategory(cat._id);
      const updated = await listCategories();
      setCategories(updated);
      setCategoryModal(false);
      setEditingCategory(null);
    } catch (err) {
      setCatError(err.message || "Failed to delete category");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <DashboardShell
      title="Product Catalog"
      subtitle="Manage your handcrafted atelier collection"
      actions={
        <>
          <PrimaryButton icon="add" onClick={() => navigate("/dashboard/products/new")}>
            Add New Product
          </PrimaryButton>
          <button
            onClick={openCategoryModal}
            className="ml-3 px-4 py-2 rounded-lg bg-[#5B6D50] text-white text-sm font-semibold hover:bg-[#4A5640] transition-colors"
          >
            + Add Category
          </button>
        </>
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
            stock: selected?.stock,
            description: selected?.description,
            main: selected?.main,
            gallery: selected?.sideImages || [],
            occasion: selected?.Occasion,
            material: selected?.Material,
            colour: selected?.Colour,
            dimensions: selected?.Dimensions,
            pages: selected?.Pages,
            print: selected?.Print,
            isSoldOut: selected?.isSoldOut,
            soldOut: selected?.soldOut,
            sold: selected?.sold,
            outOfStock: selected?.outOfStock,
            availability: selected?.availability,
            status: selected?.status,
            stockStatus: selected?.stockStatus,
          }}
          onSubmit={handleUpdate}
          onSaveDraft={() => {}}
          loading={saving}
          categories={categories}
          onAddCategory={openCategoryModal}
        />
      </Modal>

      <Modal
        open={categoryModal}
        onClose={() => {
          setCategoryModal(false);
          setEditingCategory(null);
          setNewCategory("");
        }}
        title={editingCategory ? "Edit Category" : "Add Category"}
      >
        {catError && (
          <div className="mb-3 bg-[#ffdad6] text-[#93000a] px-3 py-2 rounded-lg text-sm">
            {catError}
          </div>
        )}
        <div className="space-y-4">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category name"
            className="w-full border border-[#c4c8b9] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#385419]/30 outline-none"
          />

          <div className="bg-[#f5f5f0] p-3 rounded-lg border border-[#c4c8b9]">
            <p className="text-sm text-[#5B6D50] mb-2">Existing categories:</p>
            {categories.length ? (
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {categories.map((cat) => (
                  <div
                    key={cat._id}
                    className="flex items-center justify-between gap-3 bg-white p-2 rounded border border-[#e0e0d0]"
                  >
                    <span className="text-sm text-[#1A2C08] font-medium">{cat.name}</span>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => openEditCategory(cat)}
                        className="p-1.5 text-[#5B6D50] hover:bg-[#e8ebe0] rounded transition-colors"
                        title="Edit category"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(cat)}
                        disabled={deleting}
                        className="p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6] rounded transition-colors disabled:opacity-50"
                        title="Delete category"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#5B6D50]">No categories yet.</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setCategoryModal(false);
                setEditingCategory(null);
                setNewCategory("");
              }}
              className="px-4 py-2 rounded-lg border border-[#c4c8b9] text-sm font-medium text-[#5B6D50] hover:bg-[#f5f5f0] transition-colors"
            >
              Cancel
            </button>
            {editingCategory && (
              <button
                type="button"
                onClick={() => handleDeleteCategory(editingCategory)}
                disabled={deleting || saving}
                className="px-4 py-2 rounded-lg bg-[#ba1a1a] text-white text-sm font-semibold hover:bg-[#9d1416] transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            )}
            <button
              type="button"
              onClick={handleSaveCategory}
              disabled={saving || deleting}
              className="px-4 py-2 rounded-lg bg-[#385419] text-white text-sm font-semibold hover:bg-[#2d4414] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : editingCategory ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </Modal>
    </DashboardShell>
  );
}
