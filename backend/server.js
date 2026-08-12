const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);

// Database Connection
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  let mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    mongoUri = mongod.getUri();
  }

const Product = require('./models/Product');

  mongoose.connect(mongoUri)
    .then(async () => {
      console.log('Connected to MongoDB at', mongoUri);
      
      // Seed Database
      const count = await Product.countDocuments();
      if (count === 0) {
        const defaultProducts = [
          { name: "Premium Headphones", price: 299.99, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80" },
          { name: "Minimalist Watch", price: 199.50, category: "Apparel", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" },
          { name: "Smart Speaker", price: 149.00, category: "Electronics", image: "https://images.unsplash.com/photo-1589492477829-5e65395b66ea?w=800&q=80" },
          { name: "Ergonomic Keyboard", price: 129.99, category: "Electronics", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80" },
          { name: "Wireless Mouse", price: 79.99, category: "Electronics", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80" },
          { name: "Ceramic Mug", price: 24.00, category: "Home Goods", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80" },
          { name: "Cozy Scarf", price: 45.00, category: "Apparel", image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80" },
          { name: "Desk Lamp", price: 85.00, category: "Home Goods", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80" }
        ];
        await Product.insertMany(defaultProducts);
        console.log('Seeded default products');
      }

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
};

startServer();

// Routes
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');
const notificationRoutes = require('./routes/notifications');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('API is running...');
});
