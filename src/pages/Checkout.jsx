import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../contexts/CartContext";
import { apiFetch } from "../dashboard/api/client";
import { getImageUrl } from "../utils/productImages";
import { WHATSAPP_NUMBER } from "../constants/site";

const Checkout = () => {
  const { cart, removeFromCart } = useCart();

  const shipping = 50;
  const taxes = 20;
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = subtotal + shipping + taxes;

  const [step, setStep] = useState(1);
  const progress = step === 1 ? 50 : 100;
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

 const placeOrder = async () => {
  setPlacing(true);
  setError("");

  const orderId = `MD-${Date.now()}`;

  const orderPayload = {
    orderId,
    customer: {
      name: shippingDetails.name,
      email: shippingDetails.email,
      phone: shippingDetails.phone,
      address: shippingDetails.address,
      city: shippingDetails.city,
      state: "",
      postalCode: shippingDetails.pincode,
    },
    items: cart.map((item) => ({
      productId: item._id,
      title: item.title,
      price: Number(item.price),
      quantity: item.quantity,
      image: getImageUrl(item.main),
    })),
    status: "pending",
    total,
    placedAt: new Date().toISOString(),
    notes: "Order placed via WhatsApp",
  };

  try {
    await apiFetch("/orders", {
      method: "POST",
      body: orderPayload,
    });

    // Emojis defined by code point so they can never be corrupted by file
    // encoding — these always render correctly in WhatsApp.
    // Only universally-supported emojis (Unicode 6.0, 2010) so they render on
    // every device. 🪷 lotus (Unicode 14.0) was dropped — too new for some phones.
    const E = {
      flower: "\u{1F338}", // 🌸
      person: "\u{1F464}", // 👤
      phone: "\u{1F4DE}", // 📞
      pin: "\u{1F4CD}", // 📍
      receipt: "\u{1F4DD}", // 📝
      money: "\u{1F4B0}", // 💰
      check: "\u{2705}", // ✅
    };

    const itemLines = cart
      .map(
        (i) =>
          `• ${i.title} ×${i.quantity} — ₹${(i.price * i.quantity).toFixed(2)}`
      )
      .join("\n");

    const message = `${E.flower} *New Order — ${orderId}*

${E.person} *Customer*
${shippingDetails.name}
${E.phone} ${shippingDetails.phone}

${E.pin} *Delivery Address*
${shippingDetails.address}, ${shippingDetails.city} - ${shippingDetails.pincode}

${E.receipt} *Order Summary*
${itemLines}

Subtotal: ₹${subtotal.toFixed(2)}
Shipping: ₹${shipping.toFixed(2)}
Taxes: ₹${taxes.toFixed(2)}
${E.money} *Total: ₹${total.toFixed(2)}*

${E.check} Please confirm this order and share payment details (UPI / bank transfer / cash on delivery).

Thank you for supporting handmade Madhubani art! ${E.flower}`;

    const encodedMessage = encodeURIComponent(message);

    // Universal wa.me link — opens the WhatsApp app on mobile and WhatsApp Web
    // on desktop. Avoids the "whatsapp://" scheme, which throws an
    // "address is invalid" error in browsers without the app installed.
    const webLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Keep the link so the confirmation screen always shows a working
    // "Send on WhatsApp" button (auto-open below may be blocked by the browser
    // because it runs after the await above).
    setWhatsappUrl(webLink);
    window.open(webLink, "_blank", "noopener,noreferrer");

    setStep(2);
  } catch (err) {
    setError(err.message || "Failed to place order");
  } finally {
    setPlacing(false);
  }
};

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-[#2F5965] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps */}
      <div className="flex items-center justify-between md:justify-center gap-8 md:gap-20 mb-10">
        {["Shipping", "Confirmation"].map((label, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className={`w-5 h-5 rounded-full border-2 ${
                step > i ? "bg-[#2F5965] border-[#2F5965]" : "border-gray-400"
              }`}
            ></div>
            <span className="mt-2 text-xs md:text-sm">{label}</span>
          </div>
        ))}
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* LEFT */}
        <div>
          {step === 1 && (
            <>
              <h2 className="text-lg md:text-xl font-bold mb-4">Shipping Details</h2>

              <div className="space-y-3">
                <input
                  name="name"
                  autoComplete="name"
                  className="w-full rounded-lg border border-[#D8DEC4] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#2F5965] md:text-base"
                  placeholder="Full Name"
                  value={shippingDetails.name}
                  onChange={handleChange}
                />

                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    className="flex-1 rounded-lg border border-[#D8DEC4] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#2F5965] md:text-base"
                    placeholder="Email"
                    value={shippingDetails.email}
                    onChange={handleChange}
                  />
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    className="flex-1 rounded-lg border border-[#D8DEC4] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#2F5965] md:text-base"
                    placeholder="Phone"
                    value={shippingDetails.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    name="city"
                    autoComplete="address-level2"
                    className="flex-1 rounded-lg border border-[#D8DEC4] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#2F5965] md:text-base"
                    placeholder="City"
                    value={shippingDetails.city}
                    onChange={handleChange}
                  />
                  <input
                    name="pincode"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    className="flex-1 rounded-lg border border-[#D8DEC4] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#2F5965] md:text-base"
                    placeholder="Pincode"
                    value={shippingDetails.pincode}
                    onChange={handleChange}
                  />
                </div>

                <textarea
                  name="address"
                  autoComplete="street-address"
                  className="w-full rounded-lg border border-[#D8DEC4] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#2F5965] md:text-base"
                  rows="2"
                  placeholder="Full Address"
                  value={shippingDetails.address}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                onClick={placeOrder}
                disabled={placing || cart.length === 0}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 font-semibold text-[#0b3d1f] transition hover:bg-[#1ebe5a] disabled:opacity-50 md:w-auto"
              >
                <FaWhatsapp className="text-lg" />
                {placing ? "Placing order..." : "Place Order & Confirm on WhatsApp"}
              </button>
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </>
          )}
        </div>

        {/* RIGHT */}
        {step !== 2 && (
          <div className="md:self-start rounded-2xl border border-[#E7DFC9] bg-[#FDFCF5] p-5 md:p-6 shadow-[0_10px_40px_rgba(26,44,8,0.05)]">
            <h2 className="mb-4 text-lg md:text-xl text-[#1A2C08]">Order Summary</h2>

            <div className="divide-y divide-[#EAE4D2]">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-3 py-3 first:pt-0">
                  <img
                    src={getImageUrl(item.main)}
                    className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-lg border border-[#EAE4D2] bg-white object-contain p-1"
                    alt={item.title}
                  />
                  <div className="flex flex-1 flex-col text-sm">
                    <p className="font-medium text-[#1A2C08] line-clamp-2">{item.title}</p>
                    <p className="mt-0.5 text-[#4A5E30]">Qty: {item.quantity}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-semibold text-[#1A2C08]">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        className="text-xs text-red-500 underline-offset-2 hover:underline"
                        onClick={() => removeFromCart(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-5 space-y-2.5 border-t border-[#EAE4D2] pt-4 text-sm md:text-base">
              <div className="flex justify-between text-[#4A5E30]">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#4A5E30]">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#4A5E30]">
                <span>Taxes</span>
                <span>₹{taxes.toFixed(2)}</span>
              </div>
              <div className="mt-1 flex justify-between border-t border-[#EAE4D2] pt-3 text-lg font-semibold text-[#1A2C08]">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CONFIRMATION */}
      {step === 2 && (
        <div className="bg-gray-50 rounded-lg shadow p-6 mt-10">
          <div className="text-center border-b pb-6 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              ORDER CONFIRMATION
            </h2>
            <p className="text-base md:text-lg mt-2 font-medium">
              “Thank you for your order!”
            </p>
           <p className="text-green-600 font-medium mt-3 text-sm md:text-base">
  Tap the button below, then press <strong>Send</strong> on WhatsApp to confirm your order.
</p>

            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-7 py-3.5 font-semibold text-[#0b3d1f] transition hover:bg-[#1ebe5a]"
              >
                <FaWhatsapp className="text-lg" />
                Send Order on WhatsApp
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Order Details */}
            <div className="border rounded-lg p-6 bg-white">
              <h3 className="font-semibold text-gray-700 mb-4 uppercase text-sm md:text-base">
                Order Details
              </h3>

              {cart.map((item) => (
                <div key={item._id} className="flex items-start gap-4 mb-4">
                  <img
                    src={getImageUrl(item.main)}
                    alt={item.title}
                    className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded border bg-white object-contain p-1"
                  />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Quantity: {item.quantity}
                    </p>
                    <p className="mt-1 font-semibold">₹{item.price}</p>
                  </div>
                </div>
              ))}

              <div className="text-xs md:text-sm space-y-1 mt-4">
                <p>
                  Order ID: <span className="font-medium">FX{Math.floor(Math.random() * 100000)}</span>
                </p>
                <p>
                  Order Date: <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </p>
                <p>
                  Payment Mode: <span className="font-medium">Not required</span>
                </p>
                <p>
                  Estimated Delivery Date:{" "}
                  <span className="font-medium">
                    {new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="border rounded-lg p-6 bg-white">
              <h3 className="font-semibold text-gray-700 mb-4 uppercase text-sm md:text-base">
                Delivery Details
              </h3>
              <div className="text-xs md:text-sm space-y-1">
                <p><span className="font-medium">Name:</span> {shippingDetails.name}</p>
                <p><span className="font-medium">Email:</span> {shippingDetails.email}</p>
                <p><span className="font-medium">Phone:</span> {shippingDetails.phone}</p>
                <p><span className="font-medium">Address:</span> {shippingDetails.address}</p>
                <p><span className="font-medium">City:</span> {shippingDetails.city}</p>
                <p><span className="font-medium">Pincode:</span> {shippingDetails.pincode}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
