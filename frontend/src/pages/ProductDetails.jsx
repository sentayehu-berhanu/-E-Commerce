import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { ProductContext } from '../context/ProductContext';
import { CurrencyContext } from '../context/CurrencyContext';
import ProductCard from '../components/ProductCard';
import gsap from 'gsap';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { products } = useContext(ProductContext);
  const { formatPrice } = useContext(CurrencyContext);
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${API_URL}/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        const localProduct = products.find(p => p._id === id || String(p.id) === id);
        if (localProduct) {
          setProduct(localProduct);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, products]);

  useEffect(() => {
    if (product) {
      gsap.from(".product-detail-anim", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      });

      // Track Recently Viewed
      const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
      const updatedViewed = [product, ...recentlyViewed.filter(p => (p._id || p.id) !== (product._id || product.id))].slice(0, 4);
      localStorage.setItem('recentlyViewed', JSON.stringify(updatedViewed));
    }
  }, [product]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!user || !user._id) {
      setReviewError("You must be logged in to leave a review.");
      return;
    }
    
    setSubmittingReview(true);
    setReviewError("");

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/products/${id}/reviews`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          user: user._id,
          name: user.name,
          rating,
          comment
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add review');

      // Optimistically add review to state
      setProduct(prev => ({
        ...prev,
        reviews: [...(prev.reviews || []), { user: user._id, name: user.name, rating, comment, createdAt: new Date().toISOString() }]
      }));
      setComment("");
      setRating(5);
    } catch (err) {
      setReviewError(err.message);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', fontSize: '1.2rem' }}>Loading product...</div>;
  if (!product) return <div style={{ textAlign: 'center', padding: '100px', fontSize: '1.2rem' }}>Product not found. <Link to="/">Go Home</Link></div>;

  const averageRating = product.reviews && product.reviews.length > 0
    ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)
    : 0;

  const recommendedProducts = products
    .filter(p => p.category === product?.category && (p._id || p.id) !== (product?._id || product?.id))
    .slice(0, 4);
  
  if (recommendedProducts.length < 4) {
    const others = products
      .filter(p => p.category !== product?.category && (p._id || p.id) !== (product?._id || product?.id))
      .slice(0, 4 - recommendedProducts.length);
    recommendedProducts.push(...others);
  }

  return (
    <div style={{ background: '#f5f5f7', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: '#86868b', marginBottom: '20px' }}>
          <Link to="/" style={{ color: '#86868b', textDecoration: 'none' }}>Home</Link> <span style={{ margin: '0 5px' }}>›</span> 
          <Link to={`/?category=${product.category}#shop`} style={{ color: '#86868b', textDecoration: 'none' }}>{product.category}</Link> <span style={{ margin: '0 5px' }}>›</span> 
          <span style={{ color: '#111' }}>{product.name}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', marginBottom: '40px' }}>
          
          {/* Image */}
          <div className="product-detail-anim" style={{ background: '#f8f8f8', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
            <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
          </div>

          {/* Details */}
          <div className="product-detail-anim" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#111', margin: '0 0 15px 0' }}>{product.name}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
              <div style={{ color: '#ffb800', fontSize: '1.2rem', display: 'flex' }}>
                {[1,2,3,4,5].map(star => (
                  <span key={star} style={{ color: star <= Math.round(averageRating) ? '#ffb800' : '#e0e0e0' }}>★</span>
                ))}
              </div>
              <span style={{ fontSize: '0.9rem', color: '#555', fontWeight: 600 }}>{averageRating} out of 5</span>
              <span style={{ fontSize: '0.9rem', color: '#86868b' }}>({product.reviews?.length || 0} reviews)</span>
            </div>

            <p style={{ fontSize: '2rem', fontWeight: 600, color: '#111', margin: '0 0 30px 0' }}>{formatPrice(product.price)}</p>
            
            <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.6', marginBottom: '40px' }}>
              Experience the perfect blend of premium materials and cutting-edge design. This product is engineered to elevate your daily routine with uncompromising quality and style.
            </p>

            <button 
              onClick={() => addToCart(product)}
              style={{ padding: '18px 30px', background: '#7a3ef5', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', transition: 'transform 0.2s, boxShadow 0.2s', boxShadow: '0 10px 20px rgba(122, 62, 245, 0.2)' }}
              onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 15px 25px rgba(122, 62, 245, 0.3)'; }}
              onMouseLeave={(e) => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 10px 20px rgba(122, 62, 245, 0.2)'; }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="product-detail-anim" style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111', marginBottom: '30px' }}>Customer Reviews</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '50px' }}>
            
            {/* Write a Review */}
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px' }}>Write a Review</h3>
              {user ? (
                <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: '#555' }}>Rating</label>
                    <select 
                      value={rating} 
                      onChange={e => setRating(Number(e.target.value))}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none' }}
                    >
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Very Good</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Fair</option>
                      <option value="1">1 - Poor</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px', color: '#555' }}>Review</label>
                    <textarea 
                      required
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      placeholder="What did you like or dislike?"
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', minHeight: '100px', resize: 'vertical' }}
                    />
                  </div>
                  {reviewError && <p style={{ color: '#ff3b30', fontSize: '0.9rem', margin: 0 }}>{reviewError}</p>}
                  <button 
                    type="submit" 
                    disabled={submittingReview}
                    style={{ padding: '12px 20px', background: '#111', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', opacity: submittingReview ? 0.7 : 1 }}
                  >
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              ) : (
                <div style={{ padding: '20px', background: '#f9f9fb', borderRadius: '12px', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 10px 0', color: '#555' }}>Please log in to leave a review.</p>
                  <Link to="/login" style={{ color: '#7a3ef5', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link>
                </div>
              )}
            </div>

            {/* List Reviews */}
            <div>
              {product.reviews && product.reviews.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {product.reviews.map((r, index) => (
                    <div key={index} style={{ padding: '20px', border: '1px solid #f0f0f0', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div style={{ fontWeight: 600, color: '#111' }}>{r.name}</div>
                        <div style={{ color: '#86868b', fontSize: '0.85rem' }}>{new Date(r.createdAt).toLocaleDateString()}</div>
                      </div>
                      <div style={{ color: '#ffb800', fontSize: '1rem', marginBottom: '10px', display: 'flex' }}>
                        {[1,2,3,4,5].map(star => (
                          <span key={star} style={{ color: star <= r.rating ? '#ffb800' : '#e0e0e0' }}>★</span>
                        ))}
                      </div>
                      <p style={{ margin: 0, color: '#555', lineHeight: '1.5' }}>{r.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#86868b', background: '#f9f9fb', borderRadius: '12px' }}>
                  No reviews yet. Be the first to review this product!
                </div>
              )}
            </div>

          </div>
        </div>

        {/* AI Recommendations */}
        <div className="product-detail-anim" style={{ marginTop: '60px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#111', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.5rem' }}>🤖</span> You may also like
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
            {recommendedProducts.map(p => (
              <ProductCard key={p._id || p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
