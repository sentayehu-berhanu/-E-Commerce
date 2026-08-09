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
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : defaultProducts;
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    // Generate a simple ID
    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts([...products, { ...newProduct, id: nextId, price: parseFloat(newProduct.price) }]);
  };

  const editProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === parseInt(id) ? { ...updatedProduct, id: parseInt(id), price: parseFloat(updatedProduct.price) } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== parseInt(id)));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, editProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
