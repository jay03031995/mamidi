// components/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Navbar";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Layout;
