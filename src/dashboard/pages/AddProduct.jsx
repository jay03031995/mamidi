import React, { useState, useEffect } from "react";
import { DashboardShell } from "../components/DashboardShell";
import { ProductForm } from "../components/ProductForm";
import { createProduct } from "../api/products";
import { listCategories, createCategory } from "../api/categories";
import Modal from "../components/Modal";

export default function AddProduct() {
  const [status, setStatus] = useState({ type: "idle" });
  const [categories, setCategories] = useState([]);
  const [categoryModal, setCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [catError, setCatError] = useState("");

  useEffect(() => {
    listCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const handleSubmit = async (payload) => {
    try {
      setStatus({ type: "loading" });
      await createProduct(payload);
      setStatus({ type: "success", message: "Product created" });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  };

  const handleCreateCategory = async () => {
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
  };

  return (
    <DashboardShell
      title="Curate New Creation"
      subtitle="Translate your manual craft into the digital catalog."
    >
      {status.type === "error" && (
        <div className="mb-4 rounded-lg bg-[#ffdad6] text-[#93000a] px-4 py-3">
          {status.message}
        </div>
      )}
      {status.type === "success" && (
        <div className="mb-4 rounded-lg bg-[#caeea1] text-[#324e14] px-4 py-3">
          {status.message}
        </div>
      )}

      <ProductForm
        onSubmit={handleSubmit}
        onSaveDraft={(draft) => console.info("Draft saved locally", draft)}
        loading={status.type === "loading"}
        categories={categories}
        onAddCategory={() => setCategoryModal(true)}
      />

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
              onClick={handleCreateCategory}
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
