import { Link } from "react-router-dom";
import { useContext, useState, useEffect, useMemo } from "react";
import { ProductContext } from "../context/ProductContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6666'];

export default function AdminDashboard() {
  const { products, deleteProduct } = useContext(ProductContext);
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const token = user.token ? `Bearer ${user.token}` : "";

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${API_URL}/orders`, { headers: { Authorization: token } })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
      const token = user.token ? `Bearer ${user.token}` : "";
      
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      const updatedOrders = orders.map(order => 
        order._id === orderId || order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (err) {
      console.error(err);
    }
  };

  const totalSales = parseFloat(localStorage.getItem("totalSales") || "0");
  const totalOrders = parseInt(localStorage.getItem("totalOrders") || "0", 10);

  // Data for Line Chart (Sales over time)
  const salesData = useMemo(() => {
    if (orders.length === 0) {
      // Dummy data if no orders
      return [
        { name: 'Mon', sales: 120 },
        { name: 'Tue', sales: 300 },
        { name: 'Wed', sales: 250 },
        { name: 'Thu', sales: 400 },
        { name: 'Fri', sales: 150 },
        { name: 'Sat', sales: 500 },
        { name: 'Sun', sales: 450 },
      ];
    }
    
    // Group real orders by date
    const grouped = {};
    orders.forEach(order => {
      const date = new Date(order.createdAt || order.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      grouped[date] = (grouped[date] || 0) + order.total;
    });
    
    return Object.keys(grouped).map(date => ({ name: date, sales: grouped[date] }));
  }, [orders]);

  // Data for Pie Chart (Products by Category)
  const categoryData = useMemo(() => {
    const grouped = {};
    products.forEach(p => {
      grouped[p.category] = (grouped[p.category] || 0) + 1;
    });
    return Object.keys(grouped).map(cat => ({ name: cat, value: grouped[cat] }));
  }, [products]);

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

      {/* Analytics Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '40px' }}>
        
        {/* Sales Line Chart */}
        <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <h2 style={{ margin: '0 0 30px 0', fontSize: '1.5rem' }}>Sales Overview</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#86868b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#86868b', fontSize: 12 }} dx={-10} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Sales']}
                />
                <Line type="monotone" dataKey="sales" stroke="#7a3ef5" strokeWidth={4} dot={{ r: 6, fill: '#7a3ef5', strokeWidth: 2, stroke: 'white' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Pie Chart */}
        <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <h2 style={{ margin: '0 0 30px 0', fontSize: '1.5rem' }}>Products by Category</h2>
          <div style={{ width: '100%', height: 300, display: 'flex', justifyContent: 'center' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '1.5rem' }}>Product Management</h2>
        
        {products.length === 0 ? (
          <p style={{ color: '#86868b' }}>No products found. Add one above!</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {products.map(product => (
              <div key={product._id || product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #f0f0f0', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{product.name}</h4>
                    <p style={{ margin: '5px 0 0 0', color: '#86868b', fontSize: '0.9rem' }}>{product.category} • ${product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link 
                    to={`/admin/edit-product/${product._id || product.id}`}
                    style={{ padding: '8px 15px', background: '#f5f5f7', color: '#111', textDecoration: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 500 }}
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this product?")) {
                        deleteProduct(product._id || product.id);
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
        
        {orders.length === 0 ? (
          <p style={{ color: '#86868b' }}>No new orders today. Check back later!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {orders.map(order => (
              <div key={order._id || order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #f0f0f0', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '40px', height: '40px', background: '#f5f5f7', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem' }}>📦</div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{order._id || order.id}</h4>
                    <p style={{ margin: '5px 0 0 0', color: '#86868b', fontSize: '0.9rem' }}>{new Date(order.createdAt || order.date).toLocaleDateString()} • {order.items.length} items</p>
                    {order.email && <p style={{ margin: '2px 0 0 0', color: '#555', fontSize: '0.8rem' }}>{order.email}</p>}
                  </div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                  <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>${order.total.toFixed(2)}</p>
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order._id || order.id, e.target.value)}
                    style={{ 
                      fontSize: '0.8rem', 
                      color: order.status === 'Delivered' ? '#28a745' : (order.status === 'Cancelled' ? '#dc3545' : '#0071e3'), 
                      background: order.status === 'Delivered' ? '#e6f4ea' : (order.status === 'Cancelled' ? '#f8d7da' : '#f0f4f8'), 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      border: 'none',
                      outline: 'none',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
