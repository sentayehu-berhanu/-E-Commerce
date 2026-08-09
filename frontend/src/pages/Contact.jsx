import React from 'react';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! Your message has been sent.");
    e.target.reset();
  };

  return (
    <div style={{ background: '#f5f5f7', minHeight: '80vh', padding: '80px 20px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', borderRadius: '24px', padding: '60px', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#111', marginBottom: '10px', textAlign: 'center' }}>Contact Us</h1>
        <p style={{ textAlign: 'center', color: '#555', marginBottom: '40px' }}>We'd love to hear from you. Please fill out this form.</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', color: '#555', marginBottom: '8px' }}>Name</label>
            <input type="text" required style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', color: '#555', marginBottom: '8px' }}>Email</label>
            <input type="email" required style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', color: '#555', marginBottom: '8px' }}>Message</label>
            <textarea required rows="5" style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '1rem', boxSizing: 'border-box', resize: 'vertical' }}></textarea>
          </div>
          <button type="submit" style={{ padding: '15px', background: '#7a3ef5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', marginTop: '10px' }}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
