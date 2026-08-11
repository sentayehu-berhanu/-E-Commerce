import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function UserDashboard() {
  const { user, wishlist, logoutUser } = useContext(UserContext);
  const isLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let currentUserEmail = user?.email;
    if (!currentUserEmail) {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        currentUserEmail = JSON.parse(storedUser).email;
      }
    }
    
    if (currentUserEmail) {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      fetch(`${API_URL}/orders?email=${currentUserEmail}`)
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch(err => console.error(err));
    }
  }, [user]);

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh', fontFamily: "'Inter', sans-serif" }}>
        <h2>Please log in to view your dashboard.</h2>
        <Link to="/login" style={{ color: '#7a3ef5', textDecoration: 'none', fontWeight: 600 }}>Go to Login</Link>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '1.25rem', color: '#111' }}>Order History</h3>
            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#86868b', background: '#f9f9fb', borderRadius: '12px' }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '10px' }}>📦</span>
                You have no past orders.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {orders.map(order => (
                  <div key={order._id || order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #f0f0f0', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ width: '40px', height: '40px', background: '#f5f5f7', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem' }}>📦</div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{order._id || order.id}</h4>
                        <p style={{ margin: '5px 0 0 0', color: '#86868b', fontSize: '0.9rem' }}>{new Date(order.createdAt || order.date).toLocaleDateString()} • {order.items.length} items</p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>${order.total.toFixed(2)}</p>
                      <span style={{ fontSize: '0.8rem', color: '#0071e3', background: '#f0f4f8', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '5px' }}>{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'saved':
        return (
          <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '1.25rem', color: '#111' }}>Saved Items</h3>
            {wishlist.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#86868b', background: '#f9f9fb', borderRadius: '12px' }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '10px' }}>❤️</span>
                You haven't saved any items yet.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {wishlist.map(product => (
                  <div key={product._id || product.id} style={{ border: '1px solid #f0f0f0', borderRadius: '12px', padding: '15px', textAlign: 'center' }}>
                    <div style={{ height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15px', background: '#f8f8f8', borderRadius: '8px', padding: '10px' }}>
                      <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '0.95rem' }}>{product.name}</h4>
                    <p style={{ margin: 0, fontWeight: 600, color: '#111' }}>${product.price?.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'settings':
        return (
          <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '1.25rem', color: '#111' }}>Account Settings</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#555', marginBottom: '8px' }}>Name</label>
                <input type="text" defaultValue={user?.name || ''} style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#555', marginBottom: '8px' }}>Email</label>
                <input type="email" defaultValue={user?.email || ''} style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#555', marginBottom: '8px' }}>New Password</label>
                <input type="password" placeholder="Leave blank to keep current" style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }} />
              </div>
              <button type="button" onClick={() => alert("Settings updated!")} style={{ padding: '15px', background: '#7a3ef5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', marginTop: '10px' }}>
                Save Changes
              </button>
            </form>
          </div>
        );
      case 'dashboard':
      default:
        return (
          <>
            {/* Overview Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: 'white', borderRadius: '16px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                <p style={{ margin: '0 0 10px 0', color: '#86868b', fontSize: '0.9rem', fontWeight: 500 }}>Total Orders</p>
                <h3 style={{ margin: 0, fontSize: '2rem', color: '#111' }}>{orders.length}</h3>
              </div>
              <div style={{ background: 'white', borderRadius: '16px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                <p style={{ margin: '0 0 10px 0', color: '#86868b', fontSize: '0.9rem', fontWeight: 500 }}>Saved Items</p>
                <h3 style={{ margin: 0, fontSize: '2rem', color: '#111' }}>0</h3>
              </div>
            </div>

            {/* Recent Orders */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '1.25rem', color: '#111' }}>Recent Orders</h3>
              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#86868b', background: '#f9f9fb', borderRadius: '12px' }}>
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: '10px' }}>📦</span>
                  You haven't placed any orders yet.
                  <br />
                  <Link to="/#shop" style={{ display: 'inline-block', marginTop: '15px', color: '#7a3ef5', textDecoration: 'none', fontWeight: 600 }}>Start Shopping</Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {orders.slice(0, 5).map(order => (
                    <div key={order._id || order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #f0f0f0', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '40px', height: '40px', background: '#f5f5f7', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem' }}>📦</div>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{order._id || order.id}</h4>
                          <p style={{ margin: '5px 0 0 0', color: '#86868b', fontSize: '0.9rem' }}>{new Date(order.createdAt || order.date).toLocaleDateString()} • {order.items.length} items</p>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>${order.total.toFixed(2)}</p>
                        <span style={{ fontSize: '0.8rem', color: '#0071e3', background: '#f0f4f8', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '5px' }}>{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        );
    }
  };

  const getTabStyle = (tabName) => ({
    padding: '12px 15px', 
    background: activeTab === tabName ? '#f5f5f7' : 'transparent', 
    border: 'none', 
    borderRadius: '8px', 
    textAlign: 'left', 
    fontWeight: activeTab === tabName ? 600 : 400, 
    color: activeTab === tabName ? '#111' : '#555', 
    cursor: 'pointer'
  });

  return (
    <div style={{ background: '#f5f5f7', minHeight: '80vh', padding: '60px 20px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#111', marginBottom: '30px' }}>My Account</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
          
          {/* Sidebar */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', height: 'fit-content' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '30px', background: '#7a3ef5', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', fontWeight: 600 }}>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111' }}>{user?.name || 'User'}</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#86868b' }}>{user?.email || ''}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={() => setActiveTab('dashboard')} style={getTabStyle('dashboard')}>Dashboard</button>
              <button onClick={() => setActiveTab('orders')} style={getTabStyle('orders')}>Order History</button>
              <button onClick={() => setActiveTab('saved')} style={getTabStyle('saved')}>Saved Items</button>
              <button onClick={() => setActiveTab('settings')} style={getTabStyle('settings')}>Settings</button>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
