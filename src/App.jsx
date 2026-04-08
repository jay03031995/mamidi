// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import { CartProvider } from "./contexts/CartContext";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  ProductCatalog,
  AddProduct,
  OrderLedger,
  SalesAnalytics,
} from "./dashboard/pages";

function App() {
  return (
    <Router>
     <AuthProvider>
      <CartProvider>
        <Routes>
        {/* Wrap routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="product/:id" element={<ProductDetail/>}/>
          <Route path="cart" element={<CartPage/>}/>
          <Route path="checkout" element={<Checkout/>}/>
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard routes (standalone, protected) */}
        <Route
          path="/dashboard/catalog"
          element={
            <ProtectedRoute>
              <ProductCatalog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/products/new"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            <ProtectedRoute>
              <OrderLedger />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/analytics"
          element={
            <ProtectedRoute>
              <SalesAnalytics />
            </ProtectedRoute>
          }
        />

      </Routes>
    </CartProvider>
    </AuthProvider>
    </Router>
    
  );
}

export default App;
