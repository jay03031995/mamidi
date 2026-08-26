import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/productImages";
import { getProductStock } from "../data/shopCatalog";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const shipping = 50;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-center">
              <th className="pb-4 text-left pl-16">ITEM</th>
              <th className="pb-4">PRICE</th>
              <th className="pb-4">QUANTITY</th>
              <th className="pb-4">TOTAL</th>
              <th className="pb-4">REMOVE</th>
            </tr>
          </thead>

          <tbody>
            {cart.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  Your cart is empty.
                </td>
              </tr>
            ) : (
              cart.map((item, index) => {
                const stock = getProductStock(item);

                return (
                <tr key={item._id} className="border-b">
                  {/* Name */}
                  <td className="flex items-center gap-4 p-6">
                    <span className="text-gray-500">{index + 1}</span>
                    <img
                      src={getImageUrl(item.main)}
                      alt={item.title}
                      className="h-20 w-20 shrink-0 rounded-md border bg-white object-contain p-1"
                    />
                    <span className="font-medium">{item.title}</span>
                    {stock !== null ? (
                      <span className="text-xs font-semibold text-gray-500">
                        {stock} available
                      </span>
                    ) : null}
                  </td>

                  {/* Price */}
                  <td className="text-center p-6">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>

                  {/* Quantity */}
                  <td className="flex items-center gap-3 justify-center p-6">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, Math.max(1, item.quantity - 1))
                      }
                      className="px-2 py-1 border"
                    >
                      –
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      disabled={stock !== null && item.quantity >= stock}
                      className="px-2 py-1 border"
                    >
                      +
                    </button>
                  </td>

                  {/* Total */}
                  <td className="p-6">₹{(item.price * item.quantity).toFixed(2)}</td>

                  {/* Remove */}
                  <td className="p-6">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {cart.map((item) => {
          const stock = getProductStock(item);

          return (
          <div key={item._id} className="bg-white shadow rounded p-4 border">
            <div className="flex gap-4">
              <img
                src={getImageUrl(item.main)}
                alt={item.title}
                className="h-24 w-24 shrink-0 rounded border bg-white object-contain p-1"
              />
              <div>
                <h2 className="font-semibold text-sm">{item.title}</h2>
                <p className="text-gray-600 text-sm">₹{item.price}</p>
                {stock !== null ? (
                  <p className="text-gray-500 text-xs">{stock} available</p>
                ) : null}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    updateQuantity(item._id, Math.max(1, item.quantity - 1))
                  }
                  className="px-2 py-1 border text-sm"
                >
                  –
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  disabled={stock !== null && item.quantity >= stock}
                  className="px-2 py-1 border text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total */}
            <p className="mt-2 text-sm text-gray-700">
              Total: ₹{(item.price * item.quantity).toFixed(2)}
            </p>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-500 text-sm mt-2 underline"
            >
              Remove
            </button>
          </div>
          );
        })}
      </div>

      {/* Discount + Totals */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Discount */}
       

        {/* Totals */}
        <div className="p-4 sm:p-6 space-y-4 border rounded">
          <div className="flex justify-between border-b pb-2 text-sm sm:text-base">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b pb-2 text-sm sm:text-base">
            <span>Shipping</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => navigate("/shop")}
              className="rounded border border-[#2F5965] px-6 py-3 text-sm text-[#2F5965] transition hover:bg-[#2F5965] hover:text-white w-full sm:w-auto"
            >
              Continue Shopping
            </button>

            <button
              onClick={() => navigate("/checkout")}
              disabled={cart.length === 0}
              className="rounded bg-[#2F5965] text-white px-6 py-3 text-sm transition hover:bg-[#264a54] disabled:opacity-50 w-full sm:w-auto"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
