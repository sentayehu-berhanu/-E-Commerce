import { useContext, useState } from "react";
import gsap from "gsap";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  const handleEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.03,
      y: -5,
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

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div 
      className="card"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="card-image-container">
        <img src={product.image} alt={product.name} />
        <button 
          className="card-add-btn"
          onClick={handleAddToCart}
          style={added ? { background: '#28a745', color: 'white' } : {}}
        >
          {added ? '✓ Added' : '+ Add to Cart'}
        </button>
      </div>
      <div className="card-text-container">
        <h3>{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
