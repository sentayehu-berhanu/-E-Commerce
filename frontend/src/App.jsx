import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { pageEnter } from "./animations/pageTransition";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

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
      </Routes>
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <AnimatedRoutes />
      </BrowserRouter>
    </CartProvider>
  );
}
