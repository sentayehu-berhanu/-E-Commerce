import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import gsap from "gsap";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logoutUser } = useContext(UserContext);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isLoggedIn = user !== null || localStorage.getItem("isUserLoggedIn") === "true";
  
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const cartIconRef = useRef();

  useEffect(() => {
    if (cartCount > 0) {
      gsap.fromTo(cartIconRef.current, 
        { scale: 1 }, 
        { scale: 1.3, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.inOut" }
      );
    }
  }, [cartCount]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}#shop`);
      setShowSearch(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    navigate(`/?search=${encodeURIComponent(e.target.value)}#shop`);
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', background: 'white', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 100, fontFamily: "'Inter', sans-serif" }}>
      
      {/* Left: Logo */}
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111', textDecoration: 'none', letterSpacing: '2px' }}>
        LUXE
      </Link>

      {/* Center: Links */}
      <div style={{ display: 'flex', gap: '35px', alignItems: 'center', fontSize: '0.9rem', fontWeight: 500 }}>
        <Link to="/" style={{ color: '#111', textDecoration: 'none', borderBottom: '2px solid #7a3ef5', paddingBottom: '5px' }}>Home</Link>
        <a href="/#shop" style={{ color: '#555', textDecoration: 'none' }}>Shop</a>
        
        {/* Categories Dropdown */}
        <div 
          className="group"
          style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%', padding: '20px 0' }}
        >
          <span style={{ color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
            Categories <span style={{ fontSize: '0.7rem' }}>▼</span>
          </span>
          <div 
            className="hidden group-hover:flex absolute top-full left-0 bg-white shadow-2xl shadow-black/5 rounded-xl flex-col py-2 min-w-[180px] border border-gray-100"
          >
            <Link to="/#shop" className="px-5 py-2.5 text-gray-500 no-underline font-semibold border-b border-gray-100 mb-1 hover:bg-gray-50">All Products</Link>
            <Link to="/?category=New Arrivals#shop" className="px-5 py-2.5 text-gray-500 no-underline hover:bg-gray-50">New Arrivals</Link>
            <Link to="/?category=Electronics#shop" className="px-5 py-2.5 text-gray-500 no-underline hover:bg-gray-50">Electronics</Link>
            <Link to="/?category=Home Goods#shop" className="px-5 py-2.5 text-gray-500 no-underline hover:bg-gray-50">Home Goods</Link>
            <Link to="/?category=Apparel#shop" className="px-5 py-2.5 text-gray-500 no-underline hover:bg-gray-50">Apparel</Link>
          </div>
        </div>

        <Link to="/about" className="text-gray-500 no-underline hover:text-gray-900">About</Link>
        <Link to="/contact" className="text-gray-500 no-underline hover:text-gray-900">Contact</Link>
        <Link to="/admin" className="text-gray-500 no-underline hover:text-gray-900">Admin</Link>
      </div>

      {/* Right: Icons */}
      <div className="flex gap-6 items-center text-xl text-gray-900">
        
        {/* Search */}
        <div className="relative flex items-center">
          {showSearch && (
            <form onSubmit={handleSearchSubmit} className="absolute right-9 -top-1">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
                style={{
                  padding: '8px 15px',
                  borderRadius: '20px',
                  border: '1px solid #e0e0e0',
                  outline: 'none',
                  fontSize: '0.9rem',
                  width: '200px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}
              />
            </form>
          )}
          <span style={{ cursor: 'pointer' }} onClick={() => setShowSearch(!showSearch)}>🔍</span>
        </div>
        
        {isLoggedIn ? (
          <div 
            style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%', padding: '20px 0' }}
            onMouseEnter={(e) => { e.currentTarget.querySelector('.user-dropdown').style.display = 'flex'; }}
            onMouseLeave={(e) => { e.currentTarget.querySelector('.user-dropdown').style.display = 'none'; }}
          >
            <span style={{ cursor: 'pointer', fontSize: '1.2rem', padding: 0 }}>👤</span>
            <div 
              className="user-dropdown"
              style={{
                display: 'none',
                position: 'absolute',
                top: '100%',
                right: -20,
                background: 'white',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                borderRadius: '12px',
                flexDirection: 'column',
                padding: '10px 0',
                minWidth: '150px',
                border: '1px solid #f0f0f0',
                zIndex: 101
              }}
            >
              <div style={{ padding: '10px 20px', color: '#86868b', fontSize: '0.75rem', fontWeight: 600, borderBottom: '1px solid #f0f0f0', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>My Account</div>
              <Link 
                to="/dashboard"
                style={{ padding: '10px 20px', color: '#111', textDecoration: 'none', textAlign: 'left', width: '100%', fontSize: '0.9rem', display: 'block' }} 
                onMouseEnter={(e) => e.target.style.background = '#f5f5f7'} 
                onMouseLeave={(e) => e.target.style.background = 'white'}
              >
                Dashboard
              </Link>
              <button 
                onClick={() => {
                  logoutUser();
                  window.location.href = "/";
                }}
                style={{ padding: '10px 20px', color: '#ff4d4f', textDecoration: 'none', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', width: '100%', fontSize: '0.9rem' }} 
                onMouseEnter={(e) => e.target.style.background = '#fff1f0'} 
                onMouseLeave={(e) => e.target.style.background = 'white'}
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }} title="Sign In">
            👤
          </Link>
        )}
        
        <Link to="/cart" id="cart-icon" ref={cartIconRef} style={{ color: 'inherit', textDecoration: 'none', position: 'relative', display: 'inline-block' }}>
          🛒
          {cartCount > 0 && (
            <span style={{ position: 'absolute', top: '-8px', right: '-12px', background: '#7a3ef5', color: 'white', fontSize: '0.7rem', fontWeight: 600, width: '18px', height: '18px', borderRadius: '9px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
