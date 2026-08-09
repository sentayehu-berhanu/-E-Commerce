import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import { ProductContext } from "../context/ProductContext";

export default function AdminAddProduct() {
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const formRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Electronics",
    image: ""
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out"
      });
    }, formRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(formData);
    navigate("/admin/dashboard");
  };

  return (
    <div style={{ padding: '80px 40px', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <div style={{ marginBottom: '40px' }}>
        <Link to="/admin/dashboard" style={{ color: '#0071e3', textDecoration: 'none', fontWeight: 500 }}>
          ← Back to Dashboard
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '15px 0 0 0' }}>Add New Product</h1>
      </div>

      <form 
        ref={formRef}
        onSubmit={handleSubmit} 
        style={{ 
          background: 'white', 
          padding: '40px', 
          borderRadius: '20px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        <div className="input-group">
          <label htmlFor="name">Product Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            placeholder="e.g., Wireless Earbuds"
          />
        </div>

        <div className="input-group">
          <label htmlFor="price">Price ($)</label>
          <input 
            type="number" 
            id="price" 
            name="price" 
            min="0.01" 
            step="0.01" 
            value={formData.price} 
            onChange={handleChange} 
            required 
            placeholder="99.99"
          />
        </div>

        <div className="input-group">
          <label htmlFor="category">Category</label>
          <select 
            id="category" 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            required
            style={{
              padding: '14px 16px',
              borderRadius: '10px',
              border: '1px solid #d2d2d7',
              background: '#f5f5f7',
              fontSize: '1rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="New Arrivals">New Arrivals</option>
            <option value="Electronics">Electronics</option>
            <option value="Home Goods">Home Goods</option>
            <option value="Apparel">Apparel</option>
          </select>
        </div>

        <div className="input-group">
          <label>Product Image</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input 
              type="text" 
              id="image" 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              required 
              placeholder="https://images... or select a file"
              style={{ flex: 1 }}
            />
            <span style={{ color: '#86868b', fontWeight: 600 }}>OR</span>
            <label 
              style={{ 
                background: '#f5f5f7', 
                border: '1px solid #d2d2d7', 
                padding: '13px 16px', 
                borderRadius: '10px', 
                cursor: 'pointer',
                fontWeight: 500,
                color: '#1d1d1f',
                whiteSpace: 'nowrap'
              }}
            >
              Choose File
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData({ ...formData, image: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }} 
                style={{ display: 'none' }} 
              />
            </label>
          </div>
          {formData.image && (
            <div style={{ marginTop: '15px', borderRadius: '12px', overflow: 'hidden', height: '150px', width: '150px' }}>
              <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="admin-login-btn" 
          style={{ marginTop: '10px', padding: '16px' }}
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
