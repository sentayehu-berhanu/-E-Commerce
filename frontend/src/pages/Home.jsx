import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Mock data since PHP API isn't built yet
    const mockProducts = [
      { id: 1, name: "Premium Headphones", price: 299.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80" },
      { id: 2, name: "Minimalist Watch", price: 199.50, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" },
      { id: 3, name: "Smart Speaker", price: 149.00, image: "https://images.unsplash.com/photo-1589492477829-5e65395b66ea?w=800&q=80" },
      { id: 4, name: "Ergonomic Keyboard", price: 129.99, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80" },
      { id: 5, name: "Wireless Mouse", price: 79.99, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80" },
      { id: 6, name: "4K Monitor", price: 499.00, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80" }
    ];
    setProducts(mockProducts);
  }, []);

  return (
    <div className="home">
      <Hero />
      <ProductGrid products={products} />
    </div>
  );
}
