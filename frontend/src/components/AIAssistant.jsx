import { useState, useRef, useEffect, useContext } from 'react';
import gsap from 'gsap';
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! What are you looking for today? I can help you find products.' }
  ]);
  const [input, setInput] = useState('');
  const chatRef = useRef();
  const messagesEndRef = useRef(null);
  
  const { products } = useContext(ProductContext);

  useEffect(() => {
    if (isOpen) {
      gsap.from(chatRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "back.out(1.2)"
      });
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    
    // Simulate AI thinking
    setTimeout(() => {
      const response = generateAIResponse(input);
      setMessages(prev => [...prev, response]);
    }, 1000);

    setInput('');
  };

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();
    let matches = [];

    // Mock AI keywords logic
    if (q.includes('laptop') || q.includes('programming') || q.includes('mac') || q.includes('pc')) {
        matches = products.filter(p => p.name.toLowerCase().includes('laptop') || p.category.toLowerCase().includes('electronics'));
    } else if (q.includes('cheap') || q.includes('under') || q.includes('affordable')) {
        matches = products.filter(p => p.price < 60).sort((a,b) => a.price - b.price);
    } else if (q.includes('gift') || q.includes('mug') || q.includes('scarf') || q.includes('home')) {
        matches = products.filter(p => p.category.toLowerCase().includes('home') || p.category.toLowerCase().includes('apparel'));
    } else {
        // Fallback: search by name/category directly
        matches = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    if (matches.length > 0) {
      const topMatches = matches.slice(0, 3);
      return {
        sender: 'ai',
        text: `I found these products that might match what you're looking for!`,
        products: topMatches
      };
    } else {
      return {
        sender: 'ai',
        text: "I couldn't find exactly what you're looking for right now, but check out our Featured Products on the homepage!"
      };
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '30px',
          background: '#111',
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.5rem',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatRef}
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '30px',
            width: '350px',
            height: '500px',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          {/* Header */}
          <div style={{ padding: '20px', background: '#7a3ef5', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ fontSize: '1.5rem' }}>🤖</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '1rem' }}>Shop Assistant</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Powered by AI</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto', background: '#f9f9fb', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                <div style={{
                  padding: '12px 16px',
                  background: msg.sender === 'user' ? '#111' : 'white',
                  color: msg.sender === 'user' ? 'white' : '#111',
                  borderRadius: msg.sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  {msg.text}
                </div>
                
                {/* Product Recommendations */}
                {msg.products && (
                  <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {msg.products.map(p => (
                      <Link to={`/product/${p._id || p.id}`} onClick={() => setIsOpen(false)} key={p._id || p.id} style={{ textDecoration: 'none' }}>
                        <div style={{ background: 'white', padding: '10px', borderRadius: '12px', border: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '10px', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateX(5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                          <img src={p.image} alt={p.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px' }} />
                          <div>
                            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#111' }}>{p.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#7a3ef5', fontWeight: 700 }}>${p.price.toFixed(2)}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} style={{ padding: '15px', background: 'white', borderTop: '1px solid #eee', display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything..."
              style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none', fontSize: '0.9rem' }}
            />
            <button type="submit" style={{ padding: '0 20px', background: '#7a3ef5', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
