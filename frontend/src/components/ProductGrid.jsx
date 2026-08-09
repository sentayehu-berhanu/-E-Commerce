import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "./ProductCard";

gsap.registerPlugin(ScrollTrigger);

export default function ProductGrid({ products }) {
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%"
          },
          opacity: 0,
          y: 50,
          duration: 0.6,
          delay: i * 0.1
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [products]);

  return (
    <div ref={ref} className="grid">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
