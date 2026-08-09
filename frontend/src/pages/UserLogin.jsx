import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";

export default function UserLogin() {
  const containerRef = useRef();
  const formRef = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if already logged in
    if (localStorage.getItem("isUserLoggedIn") === "true") {
      navigate("/");
    }

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
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError("");

    // Simulate an API call
    setTimeout(() => {
      setIsLoggingIn(false);
      
      const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      const userMatch = storedUsers.find(u => u.email === email && u.password === password);
      
      // Hardcoded check or dynamic check
      if ((email === "user@mystore.com" && password === "password123") || userMatch) {
        localStorage.setItem("isUserLoggedIn", "true");
        // Force a reload to update navbar state (simple implementation)
        window.location.href = "/";
      } else {
        setError("Invalid credentials. Please try again.");
        // Shake animation on error
        gsap.fromTo(formRef.current, 
          { x: -10 },
          { x: 10, duration: 0.1, yoyo: true, repeat: 5, onComplete: () => gsap.set(formRef.current, {x: 0}) }
        );
      }
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '40px 20px', background: '#fbfbfd' }}>
      <div ref={containerRef} style={{ background: 'white', padding: '50px 40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 10px 0' }}>Welcome Back</h2>
          <p style={{ color: '#86868b', margin: 0 }}>Sign in to continue shopping</p>
        </div>
        
        <form ref={formRef} onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #d2d2d7', background: '#f5f5f7', fontSize: '1rem', outline: 'none' }}
            />
          </div>

          {error && <div style={{ color: '#ff3b30', fontSize: '0.9rem', textAlign: 'center', background: '#fff0f0', padding: '10px', borderRadius: '8px' }}>{error}</div>}

          <div className="input-group" style={{ marginTop: '10px' }}>
            <button type="submit" disabled={isLoggingIn} style={{ width: '100%', padding: '16px', background: '#0071e3', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 600, cursor: isLoggingIn ? 'not-allowed' : 'pointer', opacity: isLoggingIn ? 0.7 : 1 }}>
              {isLoggingIn ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '30px', borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>
          <p style={{ color: '#86868b', fontSize: '0.95rem' }}>Don't have an account? <Link to="/signup" style={{ color: '#0071e3', textDecoration: 'none', fontWeight: 500 }}>Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}
