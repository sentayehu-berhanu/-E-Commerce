import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".subtitle", {
        y: 50,
        opacity: 0,
        delay: 0.3,
        duration: 1
      });

      gsap.from(".btn", {
        scale: 0.8,
        opacity: 0,
        delay: 0.6,
        duration: 0.8
      });

      // Parallax effect
      gsap.to(ref.current, {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          scrub: true
        }
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
    <section ref={ref} className="hero">
      <h1 className="title">Premium Store</h1>
      <p className="subtitle">Experience next-level shopping</p>
      <button className="btn" onClick={scrollToProducts}>Shop Now</button>
    </section>
  );
}
