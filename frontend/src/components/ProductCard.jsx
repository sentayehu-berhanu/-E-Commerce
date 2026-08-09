import { useContext, useState } from "react";
import gsap from "gsap";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div 
      className="card"
      style={{ 
        background: 'white', 
        borderRadius: '16px', 
        padding: '20px', 
        border: '1px solid #f0f0f0', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Heart Icon */}
      <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer', zIndex: 2, fontSize: '1.2rem', color: '#ccc' }}>♡</div>
      
      {/* Image */}
      <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', background: '#f8f8f8', borderRadius: '12px', padding: '20px' }}>
        <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>

      {/* Details */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', fontWeight: 600, color: '#111' }}>{product.name}</h3>
          
          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px' }}>
            <div style={{ color: '#ffb800', fontSize: '0.8rem' }}>★★★★★</div>
            <span style={{ fontSize: '0.75rem', color: '#86868b' }}>(87)</span>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#111' }}>${product.price.toFixed(2)}</p>
          
          <button 
            onClick={handleAddToCart}
            style={{ 
              width: '35px', 
              height: '35px', 
              borderRadius: '8px', 
              background: added ? '#28a745' : 'white', 
              color: added ? 'white' : '#111', 
              border: added ? 'none' : '1px solid #e0e0e0', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {added ? '✓' : '🛒'}
          </button>
        </div>
      </div>
    </div>
  );
}
