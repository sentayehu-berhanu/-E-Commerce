import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { pageEnter } from "./animations/pageTransition";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";

const AnimatedRoutes = () => {
  const location = useLocation();
  const pageRef = useRef();

  useEffect(() => {
    let ctx;
    if (pageRef.current) {
      ctx = gsap.context(() => {
        pageEnter(pageRef.current);
      }, pageRef);
    }
    return () => ctx && ctx.revert();
  }, [location]);

  return (
    <div ref={pageRef} style={{ width: '100%' }}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/admin/edit-product/:id" element={<AdminEditProduct />} />
      </Routes>
    </div>
  );
};

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <AnimatedRoutes />
        </BrowserRouter>
      </CartProvider>
    </ProductProvider>
  );
}
