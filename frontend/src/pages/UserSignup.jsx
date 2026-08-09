import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";

export default function UserSignup() {
  const containerRef = useRef();
  const formRef = useRef();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
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

  const handleSignup = (e) => {
    e.preventDefault();
    setIsSigningUp(true);
    setError("");

    // Simulate an API call
    setTimeout(() => {
      setIsSigningUp(false);
      
      try {
        const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        
        // Check if email already exists
        if (storedUsers.some(u => u.email === email)) {
          setError("An account with this email already exists.");
          gsap.fromTo(formRef.current, 
            { x: -10 },
            { x: 10, duration: 0.1, yoyo: true, repeat: 5, onComplete: () => gsap.set(formRef.current, {x: 0}) }
          );
          return;
        }

        // Add new user
        const newUser = { name, email, password };
        storedUsers.push(newUser);
        localStorage.setItem("registeredUsers", JSON.stringify(storedUsers));
        
        // Auto log in
        localStorage.setItem("isUserLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify({ name: newUser.name, email: newUser.email }));
        window.location.href = "/";
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '40px 20px', background: '#fbfbfd' }}>
      <div ref={containerRef} style={{ background: 'white', padding: '50px 40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 10px 0' }}>Create an Account</h2>
          <p style={{ color: '#86868b', margin: 0 }}>Join us to start shopping</p>
        </div>
        
        <form ref={formRef} onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="input-group">
            <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Full Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="John Doe" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #d2d2d7', background: '#f5f5f7', fontSize: '1rem', outline: 'none' }}
            />
          </div>

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
            <button type="submit" disabled={isSigningUp} style={{ width: '100%', padding: '16px', background: '#0071e3', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 600, cursor: isSigningUp ? 'not-allowed' : 'pointer', opacity: isSigningUp ? 0.7 : 1 }}>
              {isSigningUp ? "Creating Account..." : "Sign Up"}
            </button>
          </div>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '30px', borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>
          <p style={{ color: '#86868b', fontSize: '0.95rem' }}>Already have an account? <Link to="/login" style={{ color: '#0071e3', textDecoration: 'none', fontWeight: 500 }}>Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
