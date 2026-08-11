import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function ProductGrid({ products }) {
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%"
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: i * 0.1
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [products]);

  return (
    <div id="shop" style={{ background: '#f5f5f7', padding: '60px 20px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', background: 'white', borderRadius: '24px', padding: '50px', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#111', margin: 0 }}>
            {new URLSearchParams(window.location.search).get("category") || "Featured Products"}
          </h2>
          <Link to="/" style={{ color: '#111', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
            View All Products <span>→</span>
          </Link>
        </div>

        {/* Product Grid */}
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
          {products.map(p => (
            <ProductCard key={p._id || p.id} product={p} />
          ))}
          {products.length === 0 && (
            <div style={{ width: '100%', textAlign: 'center', padding: '40px', color: '#86868b', gridColumn: '1 / -1' }}>
              No products found.
            </div>
          )}
        </div>

        {/* Trust Badges - Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '60px', paddingTop: '40px', borderTop: '1px solid #f0f0f0', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#f8f8f8', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem' }}>🚚</div>
            <div>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>Free Shipping</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#86868b', maxWidth: '150px', lineHeight: '1.4' }}>Free shipping on all orders over $100</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#f8f8f8', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem' }}>🔄</div>
            <div>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>30 Days Return</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#86868b', maxWidth: '150px', lineHeight: '1.4' }}>Not satisfied? Get a full refund within 30 days</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#f8f8f8', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem' }}>🔒</div>
            <div>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>Secure Payment</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#86868b', maxWidth: '150px', lineHeight: '1.4' }}>Your payment information is processed securely</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#f8f8f8', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem' }}>💬</div>
            <div>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>24/7 Support</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#86868b', maxWidth: '150px', lineHeight: '1.4' }}>Our support team is always here to help you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
