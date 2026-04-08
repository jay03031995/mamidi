import React, { useState } from "react";
import { SectionCard, PrimaryButton, GhostButton } from "./DashboardShell";

export function ProductForm({
  initialValues = {},
  onSubmit,
  onSaveDraft,
  loading = false,
  categories = [],
  onAddCategory,
}) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    main: "",
    gallery: ["", "", "", ""],
    occasion: "",
    material: "",
    colour: "",
    dimensions: "",
    pages: "",
    print: "",
    ...initialValues,
  });

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateGallery = (index, value) => {
    setForm((prev) => {
      const gallery = [...prev.gallery];
      gallery[index] = value;
      return { ...prev, gallery };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-8">
        <SectionCard className="bg-[#f6f4e1]">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#385419]">edit_note</span>
            Core Identity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Product Name" span={2}>
              <input
                required
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full bg-white border border-transparent rounded-xl px-4 py-4 focus:ring-2 focus:ring-[#385419]/20 transition-all text-on-surface placeholder:text-[#44483d]/40"
                placeholder="e.g., Hand-Woven Indigo Throw"
                type="text"
              />
            </Field>
            <Field label="Category">
              <div className="flex gap-3">
                <select
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full bg-white border border-transparent rounded-xl px-4 py-4 focus:ring-2 focus:ring-[#385419]/20 transition-all text-on-surface"
                >
                  <option value="">Choose</option>
                  {categories.map((c) => (
                    <option key={c._id || c.slug || c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {onAddCategory && (
                  <button
                    type="button"
                    onClick={onAddCategory}
                    className="shrink-0 px-4 py-2 rounded-lg border border-[#c4c8b9] text-sm font-semibold text-[#385419] hover:bg-[#f6f4e1]"
                  >
                    + New
                  </button>
                )}
              </div>
            </Field>
            <Field label="Price (USD)">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#44483d]">
                  ₹
                </span>
                <input
                  required
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  className="w-full bg-white border border-transparent rounded-xl pl-8 pr-4 py-4 focus:ring-2 focus:ring-[#385419]/20 transition-all text-on-surface placeholder:text-[#44483d]/40"
                  placeholder="0.00"
                  type="number"
                />
              </div>
            </Field>
            <Field label="The Story (Description)" span={2}>
              <textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="w-full bg-white border border-transparent rounded-xl px-4 py-4 focus:ring-2 focus:ring-[#385419]/20 transition-all text-on-surface placeholder:text-[#44483d]/40 resize-none"
                placeholder="Describe the materials, technique, and story..."
                rows={5}
              />
            </Field>
          </div>
        </SectionCard>

        <SectionCard className="bg-white">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#385419]">image</span>
            Visual Narrative
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <UploadTile
              label="Main Image"
              value={form.main}
              onChange={(url) => updateField("main", url)}
            />
            {form.gallery.map((src, idx) => (
              <UploadTile
                key={idx}
                label={`Gallery ${idx + 1}`}
                value={src}
                onChange={(url) => updateGallery(idx, url)}
              />
            ))}
          </div>
          <p className="text-xs text-[#44483d]/70 mt-4 italic">
            * Provide hosted image URLs for now. Hook this to an uploader when available.
          </p>
        </SectionCard>

        <SectionCard className="bg-white">
          <h2 className="text-xl font-bold mb-4">Attributes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AttributeInput
              label="Occasion"
              value={form.occasion}
              onChange={(v) => updateField("occasion", v)}
            />
            <AttributeInput
              label="Material"
              value={form.material}
              onChange={(v) => updateField("material", v)}
            />
            <AttributeInput
              label="Colour"
              value={form.colour}
              onChange={(v) => updateField("colour", v)}
            />
            <AttributeInput
              label="Dimensions"
              value={form.dimensions}
              onChange={(v) => updateField("dimensions", v)}
            />
            <AttributeInput
              label="Pages"
              value={form.pages}
              onChange={(v) => updateField("pages", v)}
            />
            <AttributeInput
              label="Print"
              value={form.print}
              onChange={(v) => updateField("print", v)}
            />
          </div>
        </SectionCard>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#c4c8b9]/20">
          <div className="aspect-[4/5] bg-[#f0efdb] flex items-center justify-center">
            {form.main ? (
              <img src={form.main} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-[#44483d] text-sm">Product preview</div>
            )}
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-1">{form.title || "Untitled Masterpiece"}</h3>
            <p className="text-[#735c00] font-semibold">₹{form.price || "0.00"}</p>
            <div className="mt-4 flex gap-2">
              <span className="bg-[#f6f4e1] px-2 py-1 rounded text-[10px] uppercase font-bold text-[#44483d]">
                Draft
              </span>
              <span className="bg-[#f6f4e1] px-2 py-1 rounded text-[10px] uppercase font-bold text-[#44483d]">
                Studio Pick
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#f6f4e1] rounded-xl p-6 space-y-3">
          <PrimaryButton type="submit" icon="publish" disabled={loading}>
            {loading ? "Saving..." : "Publish to Gallery"}
          </PrimaryButton>
          <GhostButton type="button" onClick={() => onSaveDraft?.(form)}>
            Save as Draft
          </GhostButton>
        </div>
      </div>
    </form>
  );
}

function Field({ label, children, span }) {
  return (
    <div className={`space-y-2 ${span === 2 ? "md:col-span-2" : ""}`}>
      <label className="block text-sm font-medium text-[#44483d] ml-1">
        {label}
      </label>
      {children}
    </div>
  );
}

function UploadTile({ label, value, onChange }) {
  return (
    <div className="aspect-square rounded-xl border-2 border-dashed border-[#c4c8b9] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#f0efdb] transition-colors p-3">
      {value ? (
        <img src={value} alt={label} className="w-full h-full object-cover rounded-lg" />
      ) : (
        <>
          <span className="material-symbols-outlined text-[#44483d]">add_a_photo</span>
          <span className="text-xs font-medium text-[#44483d]">{label}</span>
        </>
      )}
      <input
        className="w-full text-xs text-[#44483d] bg-white border border-[#c4c8b9]/60 rounded-md px-2 py-1"
        placeholder="https://image.url"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}

function AttributeInput({ label, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-xs uppercase tracking-wide text-[#44483d]">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-white border border-transparent rounded-lg px-3 py-3 focus:ring-2 focus:ring-[#385419]/20"
        placeholder={label}
      />
    </div>
  );
}
