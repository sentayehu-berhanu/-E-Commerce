import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { NotificationContext } from "../context/NotificationContext";
import { CurrencyContext } from "../context/CurrencyContext";
import { useTranslation } from "react-i18next";
import gsap from "gsap";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logoutUser } = useContext(UserContext);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useContext(NotificationContext);
  const { currency, setCurrency, exchangeRates } = useContext(CurrencyContext);
  const { t, i18n } = useTranslation();
  
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isLoggedIn = user !== null || localStorage.getItem("isUserLoggedIn") === "true";
  
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', background: 'white', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 100, fontFamily: "'Inter', sans-serif" }}>
      
      {/* Left: Logo */}
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111', textDecoration: 'none', letterSpacing: '2px' }}>
        LUXE
      </Link>

      {/* Center: Links */}
      <div style={{ display: 'flex', gap: '35px', alignItems: 'center', fontSize: '0.9rem', fontWeight: 500 }}>
        <Link to="/" style={{ color: '#111', textDecoration: 'none', borderBottom: '2px solid #7a3ef5', paddingBottom: '5px' }}>{t('nav.home')}</Link>
        <a href="/#shop" style={{ color: '#555', textDecoration: 'none' }}>{t('nav.shop')}</a>
        
        {/* Categories Dropdown */}
        <div 
          className="group"
          style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%', padding: '20px 0' }}
        >
          <span style={{ color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
            {t('nav.categories')} <span style={{ fontSize: '0.7rem' }}>▼</span>
          </span>
          <div 
            className="hidden group-hover:flex absolute top-full left-0 bg-white shadow-2xl shadow-black/5 rounded-xl flex-col py-2 min-w-[180px] border border-gray-100"
          >
            <Link to="/#shop" className="px-5 py-2.5 text-gray-500 no-underline font-semibold border-b border-gray-100 mb-1 hover:bg-gray-50">{t('categories.all')}</Link>
            <Link to="/?category=New Arrivals#shop" className="px-5 py-2.5 text-gray-500 no-underline hover:bg-gray-50">{t('categories.newArrivals')}</Link>
            <Link to="/?category=Electronics#shop" className="px-5 py-2.5 text-gray-500 no-underline hover:bg-gray-50">{t('categories.electronics')}</Link>
            <Link to="/?category=Home Goods#shop" className="px-5 py-2.5 text-gray-500 no-underline hover:bg-gray-50">{t('categories.homeGoods')}</Link>
            <Link to="/?category=Apparel#shop" className="px-5 py-2.5 text-gray-500 no-underline hover:bg-gray-50">{t('categories.apparel')}</Link>
          </div>
        </div>

        <Link to="/about" className="text-gray-500 no-underline hover:text-gray-900">{t('nav.about')}</Link>
        <Link to="/contact" className="text-gray-500 no-underline hover:text-gray-900">{t('nav.contact')}</Link>
        <Link to="/admin" className="text-gray-500 no-underline hover:text-gray-900">{t('nav.admin')}</Link>
      </div>

      {/* Right: Icons */}
      <div className="flex gap-6 items-center text-xl text-gray-900">
        
        {/* Search */}
        <div className="relative flex items-center">
          {showSearch && (
            <form onSubmit={handleSearchSubmit} className="absolute right-9 -top-1">
              <input 
                type="text" 
                placeholder={t('nav.search') || "Search..."}
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

        {/* Settings (Lang/Currency) */}
        <div 
          style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%', padding: '20px 0' }}
          onMouseEnter={(e) => { e.currentTarget.querySelector('.settings-dropdown').style.display = 'flex'; }}
          onMouseLeave={(e) => { e.currentTarget.querySelector('.settings-dropdown').style.display = 'none'; }}
        >
          <span style={{ cursor: 'pointer', fontSize: '1.2rem', padding: 0 }}>⚙️</span>
          <div 
            className="settings-dropdown"
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
              minWidth: '200px',
              border: '1px solid #f0f0f0',
              zIndex: 101
            }}
          >
            <div style={{ padding: '5px 20px', color: '#86868b', fontSize: '0.75rem', fontWeight: 600, borderBottom: '1px solid #f0f0f0', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>Language</div>
            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '5px 10px', marginBottom: '10px' }}>
              <span onClick={() => changeLanguage('en')} style={{ cursor: 'pointer', opacity: i18n.language === 'en' ? 1 : 0.5, fontSize: '1.2rem' }}>🇺🇸</span>
              <span onClick={() => changeLanguage('fr')} style={{ cursor: 'pointer', opacity: i18n.language === 'fr' ? 1 : 0.5, fontSize: '1.2rem' }}>🇫🇷</span>
              <span onClick={() => changeLanguage('am')} style={{ cursor: 'pointer', opacity: i18n.language === 'am' ? 1 : 0.5, fontSize: '1.2rem' }}>🇪🇹</span>
            </div>
            
            <div style={{ padding: '5px 20px', color: '#86868b', fontSize: '0.75rem', fontWeight: 600, borderBottom: '1px solid #f0f0f0', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>Currency</div>
            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '5px 10px' }}>
              {Object.keys(exchangeRates).map(curr => (
                <span 
                  key={curr} 
                  onClick={() => setCurrency(curr)} 
                  style={{ cursor: 'pointer', fontWeight: currency === curr ? 700 : 400, color: currency === curr ? '#7a3ef5' : '#555', fontSize: '0.9rem' }}
                >
                  {curr}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Notifications */}
        {isLoggedIn && (
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span 
              style={{ cursor: 'pointer', position: 'relative' }} 
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) fetchNotifications();
              }}
            >
              🔔
              {unreadCount > 0 && (
                <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ff3b30', color: 'white', fontSize: '0.7rem', fontWeight: 600, width: '18px', height: '18px', borderRadius: '9px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {unreadCount}
                </span>
              )}
            </span>
            
            {showNotifications && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: -10,
                  marginTop: '15px',
                  background: 'white',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  borderRadius: '16px',
                  width: '320px',
                  border: '1px solid #f0f0f0',
                  zIndex: 101,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
              >
                <div style={{ padding: '15px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Notifications</h4>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      style={{ background: 'none', border: 'none', color: '#0071e3', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                
                <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding: '30px 20px', textAlign: 'center', color: '#86868b', fontSize: '0.9rem' }}>
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map(notif => (
                      <div 
                        key={notif._id}
                        onClick={() => {
                          if(!notif.isRead) markAsRead(notif._id);
                        }}
                        style={{
                          padding: '15px 20px',
                          borderBottom: '1px solid #f9f9f9',
                          background: notif.isRead ? 'white' : '#f4f8ff',
                          cursor: 'pointer',
                          display: 'flex',
                          gap: '12px',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = notif.isRead ? '#fafafa' : '#edf3ff'}
                        onMouseLeave={e => e.currentTarget.style.background = notif.isRead ? 'white' : '#f4f8ff'}
                      >
                        <div style={{ fontSize: '1.2rem', marginTop: '2px' }}>
                          {notif.type === 'order' ? '📦' : '💬'}
                        </div>
                        <div>
                          <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#111', lineHeight: '1.4' }}>{notif.message}</p>
                          <span style={{ fontSize: '0.75rem', color: '#86868b' }}>
                            {new Date(notif.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

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
              <div style={{ padding: '10px 20px', color: '#86868b', fontSize: '0.75rem', fontWeight: 600, borderBottom: '1px solid #f0f0f0', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('userMenu.account')}</div>
              <Link 
                to="/dashboard"
                style={{ padding: '10px 20px', color: '#111', textDecoration: 'none', textAlign: 'left', width: '100%', fontSize: '0.9rem', display: 'block' }} 
                onMouseEnter={(e) => e.target.style.background = '#f5f5f7'} 
                onMouseLeave={(e) => e.target.style.background = 'white'}
              >
                {t('userMenu.dashboard')}
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
                {t('userMenu.signOut')}
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
