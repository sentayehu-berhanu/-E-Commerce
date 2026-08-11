import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import { ProductContext } from "../context/ProductContext";

export default function Home() {
  const { products } = useContext(ProductContext);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const filteredProducts = products.filter(p => {
    const categoryMatch = !category || category === "New Arrivals" || p.category === category;
    const searchMatch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="home">
      <Hero />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
