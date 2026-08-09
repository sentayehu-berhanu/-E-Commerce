import { useContext } from "react";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import { ProductContext } from "../context/ProductContext";

export default function Home() {
  const { products } = useContext(ProductContext);

  return (
    <div className="home">
      <Hero />
      <ProductGrid products={products} />
    </div>
  );
}
