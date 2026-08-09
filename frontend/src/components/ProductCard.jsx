import { useContext } from "react";
import gsap from "gsap";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      y: -8,
      duration: 0.3
    });
  };

  const handleLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      duration: 0.3
    });
  };

  return (
    <div 
      className="card"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}
