import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const containerRef = useRef();
  const formRef = useRef();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out"
      });
      
      gsap.from(".input-group", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/users/reset-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "An error occurred during password reset.");
      }
      
      setSuccess("Your password has been successfully reset! You can now sign in with your new password.");
      setEmail("");
      setNewPassword("");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      gsap.fromTo(formRef.current, 
        { x: -10 },
        { x: 10, duration: 0.1, yoyo: true, repeat: 5, onComplete: () => gsap.set(formRef.current, {x: 0}) }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '40px 20px', background: '#fbfbfd' }}>
      <div ref={containerRef} style={{ background: 'white', padding: '50px 40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 10px 0' }}>Reset Password</h2>
          <p style={{ color: '#86868b', margin: 0 }}>Enter your email and a new password</p>
        </div>
        
        {success ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#34c759', fontSize: '3rem', marginBottom: '20px' }}>✓</div>
            <p style={{ color: '#333', fontSize: '1.1rem', lineHeight: '1.5', marginBottom: '30px' }}>{success}</p>
            <Link to="/login" style={{ display: 'inline-block', width: '100%', padding: '16px', background: '#0071e3', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none' }}>
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="input-group">
              <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="user@mystore.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #d2d2d7', background: '#f5f5f7', fontSize: '1rem', outline: 'none' }}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>New Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required 
                style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #d2d2d7', background: '#f5f5f7', fontSize: '1rem', outline: 'none' }}
              />
            </div>

            {error && <div style={{ color: '#ff3b30', fontSize: '0.9rem', textAlign: 'center', background: '#fff0f0', padding: '10px', borderRadius: '8px' }}>{error}</div>}

            <div className="input-group" style={{ marginTop: '10px' }}>
              <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '16px', background: '#0071e3', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        )}
        
        <div style={{ textAlign: 'center', marginTop: '30px', borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>
          <p style={{ color: '#86868b', fontSize: '0.95rem' }}>Remember your password? <Link to="/login" style={{ color: '#0071e3', textDecoration: 'none', fontWeight: 500 }}>Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
