import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0c', color: 'white', padding: '80px 40px 40px 40px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '60px', marginBottom: '40px' }}>
          
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', textDecoration: 'none', letterSpacing: '2px' }}>
              LUXE
            </Link>
            <p style={{ color: '#a1a1a6', fontSize: '0.85rem', lineHeight: '1.6', maxWidth: '250px' }}>
              Discover premium products with the best quality and experience.
            </p>
            <div style={{ display: 'flex', gap: '15px', color: 'white' }}>
              <span style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>f</span>
              <span style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>t</span>
              <span style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>in</span>
            </div>
          </div>

          {/* Shop */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>Shop</h4>
            <Link to="#" style={{ color: '#a1a1a6', textDecoration: 'none', fontSize: '0.85rem' }}>All Products</Link>
            <Link to="#" style={{ color: '#a1a1a6', textDecoration: 'none', fontSize: '0.85rem' }}>New Arrivals</Link>
            <Link to="#" style={{ color: '#a1a1a6', textDecoration: 'none', fontSize: '0.85rem' }}>Best Sellers</Link>
            <Link to="#" style={{ color: '#a1a1a6', textDecoration: 'none', fontSize: '0.85rem' }}>Accessories</Link>
          </div>

          {/* Customer Service */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>Customer Service</h4>
            <Link to="#" style={{ color: '#a1a1a6', textDecoration: 'none', fontSize: '0.85rem' }}>Contact Us</Link>
            <Link to="#" style={{ color: '#a1a1a6', textDecoration: 'none', fontSize: '0.85rem' }}>Shipping Policy</Link>
            <Link to="#" style={{ color: '#a1a1a6', textDecoration: 'none', fontSize: '0.85rem' }}>Returns & Refunds</Link>
            <Link to="#" style={{ color: '#a1a1a6', textDecoration: 'none', fontSize: '0.85rem' }}>FAQ</Link>
          </div>

          {/* Company */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>Company</h4>
            <Link to="#" style={{ color: '#a1a1a6', textDecoration: 'none', fontSize: '0.85rem' }}>About Us</Link>
            <Link to="#" style={{ color: '#a1a1a6', textDecoration: 'none', fontSize: '0.85rem' }}>Privacy Policy</Link>
            <Link to="#" style={{ color: '#a1a1a6', textDecoration: 'none', fontSize: '0.85rem' }}>Terms & Conditions</Link>
            <Link to="#" style={{ color: '#a1a1a6', textDecoration: 'none', fontSize: '0.85rem' }}>Careers</Link>
          </div>

          {/* Newsletter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>Newsletter</h4>
            <p style={{ color: '#a1a1a6', fontSize: '0.85rem', lineHeight: '1.6' }}>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <input type="email" placeholder="Enter your email" style={{ flex: 1, padding: '12px 15px', borderRadius: '4px 0 0 4px', border: 'none', outline: 'none', fontSize: '0.85rem' }} />
              <button style={{ padding: '0 20px', background: 'white', color: 'black', border: 'none', borderRadius: '0 4px 4px 0', fontSize: '1.2rem', cursor: 'pointer' }}>
                ➤
              </button>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ color: '#a1a1a6', fontSize: '0.75rem' }}>
            © 2024 LUXE. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '15px', fontSize: '1.2rem' }}>
            💳📱🏦🪙
          </div>
        </div>

      </div>
    </footer>
  );
}
