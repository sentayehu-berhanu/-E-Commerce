import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const productId = product._id || product.id;
    const exist = cart.find(item => (item._id || item.id) === productId);

    if (exist) {
      setCart(cart.map(item =>
        (item._id || item.id) === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => (item._id || item.id) !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      (item._id || item.id) === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
