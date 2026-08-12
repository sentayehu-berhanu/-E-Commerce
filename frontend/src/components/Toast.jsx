import { useState, useEffect } from 'react';
import gsap from 'gsap';

export default function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleShowToast = (e) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message: e.detail.message }]);

      setTimeout(() => {
        // Animate out before removing
        gsap.to(`.toast-${id}`, {
          y: 20,
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
          }
        });
      }, 3000); // Remove after 3s
    };

    window.addEventListener('show-toast', handleShowToast);
    return () => window.removeEventListener('show-toast', handleShowToast);
  }, []);

  useEffect(() => {
    // Animate newly added toasts
    if (toasts.length > 0) {
      const newToast = toasts[toasts.length - 1];
      gsap.fromTo(
        `.toast-${newToast.id}`,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }
      );
    }
  }, [toasts]);

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast-${toast.id}`}
          style={{
            background: '#7a3ef5', // Using primary brand color
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(122, 62, 245, 0.3)',
            fontSize: '0.95rem',
            fontWeight: 500,
            fontFamily: "'Inter', sans-serif"
          }}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
