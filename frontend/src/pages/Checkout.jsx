import { useEffect, useRef, useContext, useState } from "react";
import gsap from "gsap";
import { CartContext } from "../context/CartContext";
import { Link, useLocation } from "react-router-dom";



export default function Checkout() {
  const ref = useRef();
  const { cart, clearCart } = useContext(CartContext);
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Credit/Debit Card");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("session_id") || params.get("orderId")) {
      setIsSuccess(true);
      clearCart();
    }
  }, [location, clearCart]);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setEmail(JSON.parse(storedUser).email);
    }
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax in screenshot
  const total = subtotal + tax;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".checkout-wrapper", {
        y: 20,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsProcessing(true);
    
    try {
      const newOrder = {
        email: email,
        items: cart,
        total: total,
      };

      const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
      const token = user.token ? `Bearer ${user.token}` : "";

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/orders/create-checkout-session`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify(newOrder)
      });
      
      if (!res.ok) throw new Error('Failed to create checkout session');
      
      const { url } = await res.json();
      window.location.href = url; // Redirect to Stripe (or dummy success)
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      alert("Failed to place order");
    }
  };

  if (isSuccess) {
    return (
      <div ref={ref} style={{ background: '#f5f5f7', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "'Inter', sans-serif" }}>
        <div style={{ background: 'white', padding: '60px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', maxWidth: '500px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#111', marginBottom: '15px' }}>Order Placed!</h2>
          <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '30px' }}>Thank you for your purchase. We've sent a confirmation email to you with the order details.</p>
          <Link to="/" style={{ display: 'inline-block', background: '#7a3ef5', color: 'white', textDecoration: 'none', padding: '15px 30px', borderRadius: '8px', fontWeight: 600 }}>
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f5f5f7', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Inter', sans-serif" }} ref={ref}>
      <div className="checkout-wrapper" style={{ maxWidth: '1200px', margin: '0 auto', background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
        
        {/* Header */}
        <div style={{ fontSize: '0.85rem', color: '#86868b', marginBottom: '15px' }}>
          <Link to="/" style={{ color: '#86868b', textDecoration: 'none' }}>Home</Link> <span style={{ margin: '0 5px' }}>›</span> <Link to="/cart" style={{ color: '#86868b', textDecoration: 'none' }}>Cart</Link> <span style={{ margin: '0 5px' }}>›</span> Checkout
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, color: '#111', margin: '0 0 40px 0' }}>Checkout</h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '50px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          
          {/* Left Column: Billing & Payment */}
          <div style={{ flex: '1 1 600px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111', marginBottom: '20px' }}>Billing Details</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '50px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#555', marginBottom: '8px' }}>Full Name</label>
                <input type="text" placeholder="Enter your full name" required style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box' }} />
              </div>
              
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#555', marginBottom: '8px' }}>Email Address</label>
                  <input type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#555', marginBottom: '8px' }}>Phone Number</label>
                  <input type="tel" placeholder="Enter your phone number" required style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#555', marginBottom: '8px' }}>Shipping Address</label>
                <input type="text" placeholder="Enter your address" required style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#555', marginBottom: '8px' }}>City</label>
                  <input type="text" placeholder="City" required style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#555', marginBottom: '8px' }}>Zip Code</label>
                  <input type="text" placeholder="Zip Code" required style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                </div>
              </div>
            </div>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111', marginBottom: '20px' }}>Payment Method</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', border: '1px solid', borderColor: paymentMethod === 'Credit/Debit Card' ? '#7a3ef5' : '#e0e0e0', borderRadius: '12px', cursor: 'pointer', background: paymentMethod === 'Credit/Debit Card' ? '#fcfaff' : 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <input type="radio" name="payment" value="Credit/Debit Card" checked={paymentMethod === 'Credit/Debit Card'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ accentColor: '#7a3ef5', width: '18px', height: '18px' }} />
                  <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#111' }}>Credit / Debit Card</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', fontSize: '1.2rem' }}>💳</div>
              </label>

              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', border: '1px solid', borderColor: paymentMethod === 'PayPal' ? '#7a3ef5' : '#e0e0e0', borderRadius: '12px', cursor: 'pointer', background: paymentMethod === 'PayPal' ? '#fcfaff' : 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <input type="radio" name="payment" value="PayPal" checked={paymentMethod === 'PayPal'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ accentColor: '#7a3ef5', width: '18px', height: '18px' }} />
                  <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#111' }}>PayPal</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', fontSize: '1.2rem', color: '#003087' }}>P</div>
              </label>

              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', border: '1px solid', borderColor: paymentMethod === 'Cash on Delivery' ? '#7a3ef5' : '#e0e0e0', borderRadius: '12px', cursor: 'pointer', background: paymentMethod === 'Cash on Delivery' ? '#fcfaff' : 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <input type="radio" name="payment" value="Cash on Delivery" checked={paymentMethod === 'Cash on Delivery'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ accentColor: '#7a3ef5', width: '18px', height: '18px' }} />
                  <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#111' }}>Cash on Delivery</span>
                </div>
              </label>

            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div style={{ flex: '1 1 350px', background: '#fcfcfc', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '30px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111', marginBottom: '25px' }}>Order Summary</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', borderBottom: '1px solid #e0e0e0', paddingBottom: '25px', marginBottom: '25px' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '50px', height: '50px', background: 'white', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #f0f0f0' }}>
                    <img src={item.image} alt={item.name} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '0.85rem', fontWeight: 500, color: '#111' }}>{item.name}</h4>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#555' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px dashed #e0e0e0', paddingBottom: '25px', marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#555' }}>
                <span>Subtotal</span>
                <span style={{ color: '#111' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#555' }}>
                <span>Shipping</span>
                <span style={{ color: '#111' }}>Free</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#555' }}>
                <span>Tax (10%)</span>
                <span style={{ color: '#111' }}>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <span style={{ fontSize: '1rem', color: '#111', fontWeight: 600 }}>Total</span>
              <span style={{ fontSize: '1.2rem', color: '#111', fontWeight: 700 }}>${total.toFixed(2)}</span>
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#28a745', fontSize: '1.2rem' }}>🔒</span>
                <div>
                  <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, color: '#111' }}>Secure Payment</p>
                  <p style={{ margin: 0, fontSize: '0.7rem', color: '#86868b' }}>Your payment is 100% secure</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#28a745', fontSize: '1.2rem' }}>🔄</span>
                <div>
                  <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, color: '#111' }}>30 Days Return</p>
                  <p style={{ margin: 0, fontSize: '0.7rem', color: '#86868b' }}>Easy returns & refunds</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Link to="/cart" style={{ fontSize: '0.85rem', color: '#555', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
                ← Back to Cart
              </Link>
              <button type="submit" disabled={isProcessing} style={{ flex: 1, padding: '15px', background: '#7a3ef5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s', opacity: isProcessing ? 0.7 : 1 }}>
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
