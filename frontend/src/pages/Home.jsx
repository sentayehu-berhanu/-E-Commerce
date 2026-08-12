import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import { ProductContext } from "../context/ProductContext";
import { UserContext } from "../context/UserContext";

export default function Home() {
  const { products } = useContext(ProductContext);
  const { user, wishlist } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchQuery = searchParams.get("search");
  
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    setRecentlyViewed(viewed);
  }, []);

  const filteredProducts = products.filter(p => {
    const categoryMatch = !category || category === "New Arrivals" || p.category === category;
    const searchMatch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // AI Recommendation Logic based on wishlist
  const wishlistedProducts = products.filter(p => wishlist.some(item => item === (p._id || p.id) || item._id === (p._id || p.id)));
  const preferredCategories = [...new Set(wishlistedProducts.map(p => p.category))];
  
  let recommended = [];
  if (preferredCategories.length > 0) {
    recommended = products.filter(p => preferredCategories.includes(p.category)).slice(0, 4);
  } else {
    recommended = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
  }

  return (
    <div className="home" style={{ background: '#f5f5f7' }}>
      <Hero />
      
      {/* Personalized Sections for logged-in users */}
      {user && (
        <div style={{ paddingTop: '60px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
             <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: '#111' }}>Welcome back, {user.name} 👋</h2>
          </div>
          <ProductGrid products={recommended} title="Recommended for you" hideBadges={true} />
        </div>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <div style={{ paddingTop: user ? '0' : '60px' }}>
           <ProductGrid products={recentlyViewed} title="Recently Viewed" hideBadges={true} />
        </div>
      )}

      {/* Main Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
