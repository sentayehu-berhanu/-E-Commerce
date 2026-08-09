import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export default function AdminDashboard() {
  const { products, deleteProduct } = useContext(ProductContext);

  const totalSales = parseFloat(localStorage.getItem("totalSales") || "0");
  const totalOrders = parseInt(localStorage.getItem("totalOrders") || "0", 10);

  return (
    <div style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>Dashboard</h1>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/admin/add-product" style={{ padding: '10px 20px', background: '#0071e3', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
            + Add New Product
          </Link>
          <button 
            onClick={() => {
              localStorage.removeItem("isAdmin");
              window.location.href = "/";
            }}
            style={{ padding: '10px 20px', background: '#ff3b30', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {/* Stat Cards */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: 0, color: '#86868b', fontSize: '1rem' }}>Total Sales</h3>
          <p style={{ margin: '10px 0 0 0', fontSize: '2rem', fontWeight: 700, color: '#1d1d1f' }}>${totalSales.toFixed(2)}</p>
        </div>
        <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: 0, color: '#86868b', fontSize: '1rem' }}>Total Orders</h3>
          <p style={{ margin: '10px 0 0 0', fontSize: '2rem', fontWeight: 700, color: '#1d1d1f' }}>{totalOrders}</p>
        </div>
        <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: 0, color: '#86868b', fontSize: '1rem' }}>Active Products</h3>
          <p style={{ margin: '10px 0 0 0', fontSize: '2rem', fontWeight: 700, color: '#1d1d1f' }}>{products.length}</p>
        </div>
      </div>

      <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '1.5rem' }}>Product Management</h2>
        
        {products.length === 0 ? (
          <p style={{ color: '#86868b' }}>No products found. Add one above!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {products.map(product => (
              <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #f0f0f0', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{product.name}</h4>
                    <p style={{ margin: '5px 0 0 0', color: '#86868b', fontSize: '0.9rem' }}>{product.category} • ${product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link 
                    to={`/admin/edit-product/${product.id}`}
                    style={{ padding: '8px 16px', background: '#f5f5f7', color: '#1d1d1f', borderRadius: '8px', textDecoration: 'none', fontWeight: 500, border: '1px solid #d2d2d7' }}
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this product?")) {
                        deleteProduct(product.id);
                      }
                    }}
                    style={{ padding: '8px 16px', background: '#fff0f0', color: '#ff3b30', borderRadius: '8px', border: '1px solid #ffdbd9', cursor: 'pointer', fontWeight: 500 }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '1.5rem' }}>Recent Orders</h2>
        <p style={{ color: '#86868b' }}>No new orders today. Check back later!</p>
      </div>
    </div>
  );
}
