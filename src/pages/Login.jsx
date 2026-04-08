import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(email, password);
    if (ok) {
      navigate("/dashboard/catalog", { replace: true });
    } else {
      setError("Invalid credentials. Use admin@mamidi.studio / mamidi123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfae6] px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-[#385419]">Mamidi Dashboard</h1>
          <p className="text-sm text-[#44483d]">
            Sign in to manage products, orders and analytics.
          </p>
        </div>
        {error && (
          <div className="bg-[#ffdad6] text-[#93000a] px-3 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-[#44483d] block mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#c4c8b9] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#385419]/30"
              placeholder="you@studio.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#44483d] block mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#c4c8b9] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#385419]/30"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#385419] text-white py-3 rounded-lg font-semibold hover:opacity-90 active:scale-95 transition"
          >
            Login
          </button>
        </form>
        <div className="text-center text-sm text-[#44483d]">
          <Link to="/" className="underline text-[#385419]">
            Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
