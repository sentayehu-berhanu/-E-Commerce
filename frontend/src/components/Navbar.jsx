import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
  
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(searchQuery.trim()) {
      // In a full app, this would route to /search?q=searchQuery
      // For now, just close it and reset
      setSearchQuery("");
      setShowSearch(false);
      window.location.hash = "#shop";
    }
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
          style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%', padding: '20px 0' }}
          onMouseEnter={(e) => { e.currentTarget.querySelector('.dropdown-menu').style.display = 'flex'; }}
          onMouseLeave={(e) => { e.currentTarget.querySelector('.dropdown-menu').style.display = 'none'; }}
        >
          <span style={{ color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
            Categories <span style={{ fontSize: '0.7rem' }}>▼</span>
          </span>
          <div 
            className="dropdown-menu"
            style={{
              display: 'none',
              position: 'absolute',
              top: '100%',
              left: 0,
              background: 'white',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              borderRadius: '12px',
              flexDirection: 'column',
              padding: '10px 0',
              minWidth: '180px',
              border: '1px solid #f0f0f0'
            }}
          >
            <Link to="/#shop" style={{ padding: '10px 20px', color: '#555', textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid #f0f0f0', marginBottom: '5px' }} onMouseEnter={(e) => e.target.style.background = '#f5f5f7'} onMouseLeave={(e) => e.target.style.background = 'white'}>All Products</Link>
            <Link to="/?category=New Arrivals#shop" style={{ padding: '10px 20px', color: '#555', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.background = '#f5f5f7'} onMouseLeave={(e) => e.target.style.background = 'white'}>New Arrivals</Link>
            <Link to="/?category=Electronics#shop" style={{ padding: '10px 20px', color: '#555', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.background = '#f5f5f7'} onMouseLeave={(e) => e.target.style.background = 'white'}>Electronics</Link>
            <Link to="/?category=Home Goods#shop" style={{ padding: '10px 20px', color: '#555', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.background = '#f5f5f7'} onMouseLeave={(e) => e.target.style.background = 'white'}>Home Goods</Link>
            <Link to="/?category=Apparel#shop" style={{ padding: '10px 20px', color: '#555', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.background = '#f5f5f7'} onMouseLeave={(e) => e.target.style.background = 'white'}>Apparel</Link>
          </div>
        </div>

        <Link to="/about" style={{ color: '#555', textDecoration: 'none' }}>About</Link>
        <Link to="/contact" style={{ color: '#555', textDecoration: 'none' }}>Contact</Link>
        <Link to="/admin" style={{ color: '#555', textDecoration: 'none' }}>Admin</Link>
      </div>

      {/* Right: Icons */}
      <div style={{ display: 'flex', gap: '25px', alignItems: 'center', fontSize: '1.2rem', color: '#111' }}>
        
        {/* Search */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {showSearch && (
            <form onSubmit={handleSearchSubmit} style={{ position: 'absolute', right: '35px', top: '-5px' }}>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                  localStorage.removeItem("isUserLoggedIn");
                  localStorage.removeItem("currentUser");
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
        
        <Link to="/cart" style={{ color: 'inherit', textDecoration: 'none', position: 'relative' }}>
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
