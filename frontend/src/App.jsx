import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { pageEnter } from "./animations/pageTransition";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import ForgotPassword from "./pages/ForgotPassword";
import UserDashboard from "./pages/UserDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import AIAssistant from "./components/AIAssistant";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

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
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/add-product" element={<AdminRoute><AdminAddProduct /></AdminRoute>} />
        <Route path="/admin/edit-product/:id" element={<AdminRoute><AdminEditProduct /></AdminRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <Toast />
            <AIAssistant />
            <AnimatedRoutes />
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  );
}
