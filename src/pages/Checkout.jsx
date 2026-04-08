import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { apiFetch } from "../dashboard/api/client";

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
      image: item.main,
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

    // ✨ Premium formatted WhatsApp message
    const message = `🛒 *New Order - ${orderId}*

👤 *Customer Details*
Name: ${shippingDetails.name}
Phone: ${shippingDetails.phone}

📍 *Address*
${shippingDetails.address}, ${shippingDetails.city} - ${shippingDetails.pincode}

🧾 *Order Summary*
${cart
  .map(
    (i) =>
      `• ${i.title} (x${i.quantity}) - ₹${(
        i.price * i.quantity
      ).toFixed(2)}`
  )
  .join("\n")}

💰 *Total: ₹${total.toFixed(2)}*

Thank you!`;

    const encodedMessage = encodeURIComponent(message);

    const appLink = `whatsapp://send?phone=919885866281&text=${encodedMessage}`;
    const webLink = `https://wa.me/919885866281?text=${encodedMessage}`;

    // Try opening WhatsApp app
    window.location.href = appLink;

    // Fallback after 1.5 sec (if app not installed)
    setTimeout(() => {
      window.open(webLink, "_blank");
    }, 1500);

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
                  className="w-full border p-2 rounded text-sm md:text-base"
                  placeholder="Full Name"
                  value={shippingDetails.name}
                  onChange={handleChange}
                />

                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    name="email"
                    className="flex-1 border p-2 rounded text-sm md:text-base"
                    placeholder="Email"
                    value={shippingDetails.email}
                    onChange={handleChange}
                  />
                  <input
                    name="phone"
                    className="flex-1 border p-2 rounded text-sm md:text-base"
                    placeholder="Phone"
                    value={shippingDetails.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    name="city"
                    className="flex-1 border p-2 rounded text-sm md:text-base"
                    placeholder="City"
                    value={shippingDetails.city}
                    onChange={handleChange}
                  />
                  <input
                    name="pincode"
                    className="flex-1 border p-2 rounded text-sm md:text-base"
                    placeholder="Pincode"
                    value={shippingDetails.pincode}
                    onChange={handleChange}
                  />
                </div>

                <textarea
                  name="address"
                  className="w-full border p-2 rounded text-sm md:text-base"
                  rows="2"
                  placeholder="Full Address"
                  value={shippingDetails.address}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                onClick={placeOrder}
                disabled={placing || cart.length === 0}
                className="bg-[#2F5965] w-full md:w-auto text-white px-6 py-3 mt-6 rounded disabled:opacity-50"
              >
                {placing ? "Placing order..." : "Place Order & Confirm on WhatsApp"}
              </button>
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </>
          )}
        </div>

        {/* RIGHT */}
        {step !== 2 && (
          <div className="bg-white">
            {cart.map((item) => (
              <div key={item._id} className="flex gap-3 mb-4 border-b pb-4">
                <img
                  src={item.main}
                  className="w-16 h-16 md:w-20 md:h-20 rounded object-cover"
                  alt={item.title}
                />
                <div className="text-xs md:text-sm">
                  <p className="font-medium">{item.title}</p>
                  <p>₹{item.price}</p>
                  <p>Qty: {item.quantity}</p>
                  <button
                    className="text-red-500 text-xs underline"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Totals */}
            <div className="mt-6 space-y-3 text-sm md:text-base">
              <div className="flex justify-between border-b pb-2">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Taxes</span>
                <span>₹{taxes}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
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
  Tap <strong>Send</strong> on WhatsApp to confirm your order.
</p>
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
                    src={item.main}
                    alt={item.title}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded"
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
