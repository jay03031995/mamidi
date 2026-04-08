import React from "react";

export default function Modal({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0efdb]">
          <h3 className="text-lg font-semibold text-[#1c1c11]">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#f6f4e1] text-[#44483d]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
