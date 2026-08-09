import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <h2>MyStore</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart {cartCount > 0 && `(${cartCount})`}</Link>
        <Link to="/checkout">Checkout</Link>
        
        {localStorage.getItem("isUserLoggedIn") === "true" ? (
          <button 
            onClick={() => {
              localStorage.removeItem("isUserLoggedIn");
              window.location.href = "/";
            }}
            style={{ background: 'none', border: 'none', color: '#1d1d1f', cursor: 'pointer', fontSize: '1rem', padding: 0 }}
          >
            Sign Out
          </button>
        ) : (
          <Link to="/login">Sign In</Link>
        )}
        
        <Link to="/admin" style={{ color: '#0071e3' }}>Admin</Link>
      </div>
    </nav>
  );
}
