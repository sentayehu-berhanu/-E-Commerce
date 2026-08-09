import { useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const cartRef = useRef();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cart.length > 0) {
        gsap.from(".cart-item", {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1
        });
      }
    }, cartRef);

    return () => ctx.revert();
  }, [cart]);

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Inter', sans-serif" }} ref={cartRef}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Breadcrumbs */}
        <div style={{ fontSize: '0.75rem', color: '#86868b', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '15px', fontWeight: 600 }}>
          <Link to="/" style={{ color: '#86868b', textDecoration: 'none' }}>HOME</Link> / SHOPPING CART
        </div>
        
        <h1 style={{ fontSize: '2.5rem', fontWeight: 600, color: '#1d1d1f', marginBottom: '40px', letterSpacing: '-0.5px' }}>Shopping Cart</h1>

        {cart.length === 0 ? (
          <p style={{ color: '#86868b' }}>Your cart is empty. <Link to="/" style={{color: '#0071e3', textDecoration: 'none', fontWeight: 500}}>Go shopping!</Link></p>
        ) : (
          <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            
            {/* Left Column: Items */}
            <div style={{ flex: '1 1 600px' }}>
              {/* Column Headers */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#86868b', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid #e5e5ea', paddingBottom: '15px', marginBottom: '30px', fontWeight: 600 }}>
                <span>ITEM DETAILS</span>
                <span>TOTAL</span>
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {cart.map(item => (
                  <div className="cart-item" key={item.id} style={{ display: 'flex', borderBottom: '1px solid #e5e5ea', paddingBottom: '30px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', background: '#f5f5f7' }} />
                    
                    <div style={{ flex: 1, marginLeft: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#1d1d1f', fontWeight: 500 }}>{item.name}</h3>
                          <p style={{ margin: 0, color: '#86868b', fontSize: '0.9rem' }}>{item.category}</p>
                        </div>
                        <div style={{ fontWeight: 600, color: '#1d1d1f' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <span style={{ fontSize: '0.85rem', color: '#86868b', fontWeight: 500 }}>Qty</span>
                          <div style={{ display: 'flex', alignItems: 'center', background: '#fbfbfd', border: '1px solid #e5e5ea', borderRadius: '4px' }}>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              style={{ width: '30px', height: '30px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#86868b', fontSize: '1.1rem' }}
                            >-</button>
                            <span style={{ width: '30px', textAlign: 'center', fontSize: '0.95rem', fontWeight: 500, color: '#1d1d1f' }}>{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              style={{ width: '30px', height: '30px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#86868b', fontSize: '1.1rem' }}
                            >+</button>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          style={{ background: 'none', border: 'none', color: '#86868b', fontSize: '0.75rem', cursor: 'pointer', letterSpacing: '1px', padding: 0, display: 'flex', alignItems: 'center', gap: '5px', textTransform: 'uppercase', fontWeight: 600 }}
                        >
                          <span style={{ fontSize: '1rem', fontWeight: 400 }}>×</span> REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Purchase Protection Banner */}
              <div style={{ marginTop: '40px', background: '#ffffff', border: '1px solid #e5e5ea', padding: '25px', borderRadius: '12px', display: 'flex', gap: '15px' }}>
                <span style={{ fontSize: '1.5rem' }}>🛡️</span>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '0.95rem', color: '#1d1d1f' }}>Purchase Protection</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#86868b', lineHeight: '1.5' }}>Every purchase is backed by our authenticity guarantee and extended 30-day return policy. We ensure your luxury goods arrive in pristine condition.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div style={{ flex: '1 1 350px', background: '#ffffff', border: '1px solid #e5e5ea', borderRadius: '16px', padding: '35px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', position: 'sticky', top: '20px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#1d1d1f', margin: '0 0 30px 0' }}>Order Summary</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderBottom: '1px dashed #e5e5ea', paddingBottom: '25px', marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#86868b' }}>
                  <span>Subtotal</span>
                  <span style={{ color: '#1d1d1f', fontWeight: 500 }}>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#86868b' }}>
                  <span>Shipping Estimate</span>
                  <span style={{ color: '#1d1d1f', fontWeight: 500 }}>$0.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#86868b' }}>
                  <span>Tax</span>
                  <span style={{ color: '#1d1d1f', fontWeight: 500 }}>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <span style={{ fontSize: '1.1rem', color: '#1d1d1f', fontWeight: 500 }}>Total</span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: '#86868b', marginRight: '8px' }}>USD</span>
                  <span style={{ fontSize: '1.75rem', color: '#ab8b5c', fontWeight: 600 }}>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link to="/checkout" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', width: '100%', padding: '18px', background: '#ab8b5c', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'none', transition: 'background 0.2s', marginBottom: '20px' }}>
                <span>🔒</span> Proceed to Checkout
              </Link>

              <div style={{ display: 'flex', border: '1px solid #e5e5ea', borderRadius: '8px', overflow: 'hidden' }}>
                <input type="text" placeholder="Gift card or discount code" style={{ flex: 1, padding: '14px', border: 'none', outline: 'none', fontSize: '0.85rem' }} />
                <button style={{ padding: '0 20px', background: '#fbfbfd', border: 'none', borderLeft: '1px solid #e5e5ea', color: '#ab8b5c', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>APPLY</button>
              </div>

              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.7rem', color: '#86868b', letterSpacing: '1px', margin: '0 0 15px 0' }}>WE ACCEPT</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', fontSize: '1.5rem', color: '#1d1d1f' }}>
                  <span>💳</span><span>📱</span><span>🏦</span><span>🪙</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
