import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
      gsap.from(".hero-image", {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const scrollToProducts = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section ref={ref} style={{ background: '#0a0a0c', color: 'white', padding: '60px 40px 0 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
        
        {/* Left Content */}
        <div className="hero-content" style={{ flex: '1 1 500px', paddingBottom: '60px' }}>
          <p style={{ color: '#7a3ef5', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '15px' }}>New Arrival</p>
          <h1 style={{ fontSize: '4rem', fontWeight: 700, lineHeight: '1.1', marginBottom: '25px', letterSpacing: '-1px' }}>Discover Premium Products</h1>
          <p style={{ color: '#a1a1a6', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '40px', maxWidth: '400px' }}>Shop the latest collection of high-quality products crafted for the best experience.</p>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button onClick={scrollToProducts} style={{ background: '#7a3ef5', color: 'white', border: 'none', padding: '15px 35px', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}>
              Shop Now
            </button>
            <button onClick={scrollToProducts} style={{ background: 'transparent', color: 'white', border: '1px solid #333', padding: '15px 35px', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'border-color 0.2s' }}>
              Explore Collection
            </button>
          </div>

          {/* Mini Badges inside Hero */}
          <div style={{ display: 'flex', gap: '30px', marginTop: '60px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem' }}>🚚</div>
              <div>
                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600 }}>Free Shipping</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#a1a1a6' }}>On orders over $100</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem' }}>⭐</div>
              <div>
                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600 }}>Premium Quality</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#a1a1a6' }}>100% Original Products</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem' }}>🎧</div>
              <div>
                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600 }}>24/7 Support</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#a1a1a6' }}>Dedicated Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="hero-image" style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', position: 'relative' }}>
          <div style={{ width: '100%', height: '500px', background: 'url(https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80) no-repeat center center/cover', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}></div>
          <div style={{ position: 'absolute', bottom: '30px', display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(0,0,0,0.5)', padding: '10px 20px', borderRadius: '30px', backdropFilter: 'blur(10px)' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '15px', background: 'white', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.8rem', cursor: 'pointer' }}>▶</div>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Watch Video</span>
          </div>
        </div>
      </div>
    </section>
  );
}
