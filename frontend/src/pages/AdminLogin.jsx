import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const containerRef = useRef();
  const formRef = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if already logged in
    if (localStorage.getItem("isAdmin") === "true") {
      navigate("/admin/dashboard");
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
      
      // Hardcoded check
      if (email === "admin@mystore.com" && password === "admin123") {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid admin credentials. Please try again.");
        // Shake animation on error
        gsap.fromTo(formRef.current, 
          { x: -10 },
          { x: 10, duration: 0.1, yoyo: true, repeat: 5, onComplete: () => gsap.set(formRef.current, {x: 0}) }
        );
      }
    }, 1200);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container" ref={containerRef}>
        <div className="admin-login-header">
          <h2>Admin Portal</h2>
          <p>Sign in to manage your store</p>
        </div>
        
        <form ref={formRef} onSubmit={handleLogin} className="admin-login-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="admin@mystore.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <button type="submit" className="admin-login-btn" disabled={isLoggingIn}>
              {isLoggingIn ? "Authenticating..." : "Sign In"}
            </button>
          </div>
        </form>
        
        <div className="admin-login-footer">
          <Link to="/">← Back to Store</Link>
        </div>
      </div>
    </div>
  );
}
