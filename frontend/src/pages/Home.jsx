import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import { ProductContext } from "../context/ProductContext";

export default function Home() {
  const { products } = useContext(ProductContext);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const filteredProducts = category && category !== "New Arrivals"
    ? products.filter(p => p.category === category)
    : products;

  return (
    <div className="home">
      <Hero />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
