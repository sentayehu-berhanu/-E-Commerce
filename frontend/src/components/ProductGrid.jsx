import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function ProductGrid({ products }) {
  const ref = useRef();
  const [activeCategory, setActiveCategory] = useState("New Arrivals");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  let filteredProducts = activeCategory === "New Arrivals" 
    ? products 
    : products.filter(p => p.category === activeCategory);
    
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%"
          },
          opacity: 0,
          y: 50,
          duration: 0.6,
          delay: i * 0.1
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [filteredProducts]);

  const categories = ["New Arrivals", "Electronics", "Home Goods", "Apparel"];

  return (
    <div style={{ padding: '40px 20px', background: '#f5f5f7' }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        background: 'white', 
        borderRadius: '24px', 
        padding: '40px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.05)'
      }}>
        {/* Category Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '40px',
          paddingBottom: '15px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <div style={{ display: 'flex', gap: '40px', fontWeight: '500', fontSize: '1.1rem' }}>
            {categories.map(cat => (
              <span 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{ 
                  color: activeCategory === cat ? '#1d1d1f' : '#86868b', 
                  borderBottom: activeCategory === cat ? '2px solid #1d1d1f' : '2px solid transparent', 
                  paddingBottom: '15px', 
                  marginBottom: '-16px', 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '1.2rem', color: '#1d1d1f', alignItems: 'center' }}>
            {showSearch && (
              <input 
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #d2d2d7',
                  background: '#f5f5f7',
                  fontSize: '0.9rem',
                  outline: 'none',
                  width: '150px'
                }}
                autoFocus
              />
            )}
            <span style={{ cursor: 'pointer' }} onClick={() => setShowSearch(!showSearch)}>🔍</span>
            <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>🛒</Link>
          </div>
        </div>

        {/* Product Grid */}
        <div ref={ref} className="grid" style={{ padding: 0 }}>
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
          {filteredProducts.length === 0 && (
            <div style={{ width: '100%', textAlign: 'center', padding: '40px', color: '#86868b', gridColumn: '1 / -1' }}>
              No products found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
