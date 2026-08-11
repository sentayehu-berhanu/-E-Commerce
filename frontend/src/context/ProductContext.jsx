import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const defaultProducts = [
  { id: 1, name: "Premium Headphones", price: 299.99, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80" },
  { id: 2, name: "Minimalist Watch", price: 199.50, category: "Apparel", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" },
  { id: 3, name: "Smart Speaker", price: 149.00, category: "Electronics", image: "https://images.unsplash.com/photo-1589492477829-5e65395b66ea?w=800&q=80" },
  { id: 4, name: "Ergonomic Keyboard", price: 129.99, category: "Electronics", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80" },
  { id: 5, name: "Wireless Mouse", price: 79.99, category: "Electronics", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80" },
  { id: 6, name: "Ceramic Mug", price: 24.00, category: "Home Goods", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80" },
  { id: 7, name: "Cozy Scarf", price: 45.00, category: "Apparel", image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80" },
  { id: 8, name: "Desk Lamp", price: 85.00, category: "Home Goods", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80" }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(defaultProducts);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => {
        if (!res.ok) throw new Error("Backend not ready");
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(err => {
        console.error('Error fetching products (backend might still be starting), falling back to default:', err);
        // defaultProducts are already set in state
      });
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProduct, price: parseFloat(newProduct.price) })
      });
      const data = await res.json();
      setProducts([...products, data]);
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  const editProduct = async (id, updatedProduct) => {
    // In a real app we'd have a PUT route. Since we don't have one in this demo, 
    // we'd add it to the backend or just mock it here. Let's assume the backend has it.
    // For now we'll just update state if we haven't added the PUT route yet.
    setProducts(products.map(p => p._id === id || p.id === parseInt(id) ? { ...p, ...updatedProduct, price: parseFloat(updatedProduct.price) } : p));
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p._id !== id && p.id !== parseInt(id)));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, editProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
