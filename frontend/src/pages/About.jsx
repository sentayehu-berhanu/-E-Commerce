import React from 'react';

export default function About() {
  return (
    <div style={{ background: '#f5f5f7', minHeight: '80vh', padding: '80px 20px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '24px', padding: '60px', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, color: '#111', marginBottom: '20px' }}>About LUXE</h1>
        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', marginBottom: '40px' }}>
          Welcome to LUXE, your number one source for premium, high-quality products. We're dedicated to giving you the very best shopping experience, with a focus on dependability, customer service, and uniqueness.
        </p>
        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', marginBottom: '40px' }}>
          Founded in 2024, LUXE has come a long way from its beginnings. When we first started out, our passion for curating the best luxury items drove us to do intense research so that LUXE can offer you the world's most advanced and elegant products. We now serve customers all over the world, and are thrilled that we're able to turn our passion into our own website.
        </p>
        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8' }}>
          We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
        </p>
      </div>
    </div>
  );
}
