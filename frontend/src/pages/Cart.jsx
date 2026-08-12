import { useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import { CartContext } from "../context/CartContext";
import { CurrencyContext } from "../context/CurrencyContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const { formatPrice } = useContext(CurrencyContext);
  const { t } = useTranslation();
  const cartRef = useRef();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const total = subtotal; // Assuming free shipping in the screenshot

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cart.length > 0) {
        gsap.from(".cart-row", {
          x: -30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.5)"
        });
      }
    }, cartRef);

    return () => ctx.revert();
  }, [cart]);

  return (
    <div style={{ background: '#f5f5f7', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Inter', sans-serif" }} ref={cartRef}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#86868b', marginBottom: '10px' }}>
              <Link to="/" style={{ color: '#86868b', textDecoration: 'none' }}>{t('nav.home')}</Link> <span style={{ margin: '0 5px' }}>›</span> {t('cart.title')}
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#111', margin: 0 }}>{t('cart.title')}</h1>
          </div>
          <Link to="/" style={{ color: '#555', fontSize: '0.9rem', textDecoration: 'underline' }}>{t('cart.continue')}</Link>
        </div>

        {cart.length === 0 ? (
          <p style={{ color: '#86868b' }}>{t('cart.empty')}. <Link to="/" style={{color: '#7a3ef5', textDecoration: 'none', fontWeight: 500}}>{t('nav.shop')}</Link></p>
        ) : (
          <>
            {/* Table Header */}
            <div style={{ display: 'flex', fontSize: '0.85rem', color: '#86868b', borderBottom: '1px solid #f0f0f0', paddingBottom: '15px', marginBottom: '20px' }}>
              <div style={{ flex: 2 }}>Product</div>
              <div style={{ flex: 1, textAlign: 'center' }}>Price</div>
              <div style={{ flex: 1, textAlign: 'center' }}>Quantity</div>
              <div style={{ flex: 1, textAlign: 'right' }}>Total</div>
            </div>

            {/* Table Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', borderBottom: '1px solid #f0f0f0', paddingBottom: '30px', marginBottom: '30px' }}>
              {cart.map(item => (
                <div className="cart-row" key={item._id || item.id} style={{ display: 'flex', alignItems: 'center' }}>
                  
                  {/* Product */}
                  <div style={{ flex: 2, display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '80px', height: '80px', background: '#f8f8f8', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                      <img src={item.image} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                    <span style={{ fontSize: '1rem', fontWeight: 500, color: '#111' }}>{item.name}</span>
                  </div>

                  {/* Price */}
                  <div style={{ flex: 1, textAlign: 'center', fontSize: '1rem', color: '#555' }}>
                    {formatPrice(item.price)}
                  </div>

                  {/* Quantity */}
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                      <button onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)} style={{ width: '30px', height: '35px', background: 'white', border: 'none', borderRight: '1px solid #e0e0e0', cursor: 'pointer', color: '#555' }}>-</button>
                      <span style={{ width: '40px', textAlign: 'center', fontSize: '0.95rem', fontWeight: 500, color: '#111' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)} style={{ width: '30px', height: '35px', background: 'white', border: 'none', borderLeft: '1px solid #e0e0e0', cursor: 'pointer', color: '#555' }}>+</button>
                    </div>
                  </div>

                  {/* Total & Remove */}
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: '#111' }}>{formatPrice(item.price * item.quantity)}</span>
                    <button onClick={() => removeFromCart(item._id || item.id)} style={{ background: 'none', border: 'none', color: '#aaa', fontSize: '1.2rem', cursor: 'pointer' }}>×</button>
                  </div>
                  
                </div>
              ))}
            </div>

            {/* Bottom Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px' }}>
              
              {/* Coupon */}
              <div style={{ flex: '1 1 300px' }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#555' }}>Have a coupon?</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input type="text" placeholder="Enter coupon code" style={{ flex: 1, padding: '12px 15px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '0.9rem' }} />
                  <button style={{ background: '#111', color: 'white', border: 'none', padding: '0 25px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer' }}>Apply</button>
                </div>
              </div>

              {/* Totals */}
              <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: '#555' }}>
                  <span>{t('cart.subtotal')}</span>
                  <span style={{ color: '#111' }}>{formatPrice(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: '#555' }}>
                  <span>Shipping</span>
                  <span style={{ color: '#111' }}>Free</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 600, color: '#111', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #f0f0f0' }}>
                  <span>{t('cart.total')}</span>
                  <span>{formatPrice(total)}</span>
                </div>
                
                <Link to="/checkout" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '15px', background: '#7a3ef5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'none', marginTop: '10px' }}>
                  {t('cart.checkout')}
                </Link>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}
