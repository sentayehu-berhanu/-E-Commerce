import { useContext, useState } from "react";
import gsap from "gsap";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(UserContext);
  const [added, setAdded] = useState(false);

  const productId = product._id || product.id;
  
  // Wishlist returns populated products or just ObjectIds depending on populate(). 
  // Let's handle both cases just in case.
  const isWishlisted = wishlist.some(item => 
    item === productId || (item._id && item._id === productId)
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);

    // Toast
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: `${product.name} added to cart!` } }));

    // Fly animation
    const button = e.currentTarget;
    const card = button.closest('.card');
    const img = card.querySelector('img');
    const cartIcon = document.getElementById('cart-icon');

    if (img && cartIcon) {
      const imgRect = img.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();

      const flyingImg = img.cloneNode(true);
      flyingImg.style.position = 'fixed';
      flyingImg.style.left = `${imgRect.left}px`;
      flyingImg.style.top = `${imgRect.top}px`;
      flyingImg.style.width = `${imgRect.width}px`;
      flyingImg.style.height = `${imgRect.height}px`;
      flyingImg.style.zIndex = 1000;
      flyingImg.style.pointerEvents = 'none';
      document.body.appendChild(flyingImg);

      gsap.to(flyingImg, {
        x: cartRect.left - imgRect.left,
        y: cartRect.top - imgRect.top,
        scale: 0.1,
        opacity: 0.5,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          flyingImg.remove();
        }
      });
    }
  };

  const averageRating = product.reviews && product.reviews.length > 0
    ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)
    : 5.0;

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
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1)';
      }}
    >
      {/* Heart Icon */}
      <div 
        onClick={() => toggleWishlist(productId)}
        style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer', zIndex: 2, fontSize: '1.4rem', color: isWishlisted ? '#ff3b30' : '#ccc' }}
      >
        {isWishlisted ? '♥' : '♡'}
      </div>
      
      {/* Image wrapped in Link */}
      <Link to={`/product/${productId}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', background: '#f8f8f8', borderRadius: '12px', padding: '20px' }}>
          <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.4s ease' }} />
        </div>

        {/* Details */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', fontWeight: 600, color: '#111' }}>{product.name}</h3>
            
            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px' }}>
              <div style={{ color: '#ffb800', fontSize: '0.8rem' }}>
                {[1,2,3,4,5].map(star => (
                  <span key={star} style={{ color: star <= Math.round(averageRating) ? '#ffb800' : '#e0e0e0' }}>★</span>
                ))}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#86868b' }}>({product.reviews?.length || 0})</span>
            </div>
          </div>
        </div>
      </Link>

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
  );
}
