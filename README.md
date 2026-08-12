# LUXE - Modern E-Commerce Platform

LUXE is a full-stack, responsive, and internationalized E-Commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). 

## 🌟 Key Features

### Core E-Commerce
- **Product Catalog:** Browse products with categories, search, and detailed product views.
- **Shopping Cart:** Add, remove, and update quantities of items. Real-time subtotal and total calculations.
- **Checkout & Orders:** Secure checkout flow and order tracking.
- **User Authentication:** Secure registration, login, and protected accounts with JWT and password hashing.
- **Admin Dashboard:** Role-based access control for administrators to manage inventory and view insights.
- **Wishlist:** Save favorite items for later.
- **Reviews:** Customers can leave ratings and reviews for products.

### Advanced Features
- **🌍 Internationalization (i18n):** Multi-language support (English, French, Amharic) powered by `react-i18next` with seamless real-time UI updates.
- **💱 Multi-Currency Engine:** Dynamic price calculations and formatting across the store (USD, EUR, GBP, ETB).
- **🔔 Live Notifications:** An interactive notification dropdown for order updates, restocks, and sales alerts.
- **🔒 Security:** Secure routes, password hashing (bcrypt), XSS protection, and JWT authorization.
- **✨ Animations:** Smooth GSAP scroll and hover animations to deliver a premium user experience.

## 🛠️ Technology Stack
- **Frontend:** React.js, Vite, React Router, Context API, GSAP (Animations), i18next (Internationalization).
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB, Mongoose.
- **Authentication:** JSON Web Tokens (JWT), bcrypt.

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed and running locally, or a MongoDB Atlas URI

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sentayehu-berhanu/-E-Commerce.git
   cd "-E Commerce"
   ```

2. **Setup the Backend:**
   ```bash
   cd backend
   npm install
   ```
   *Create a `.env` file in the `backend` directory and add your environment variables (e.g., `MONGO_URI`, `JWT_SECRET`, `PORT=5000`).*
   ```bash
   npm run dev
   ```

3. **Setup the Frontend:**
   Open a new terminal window.
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **View the app:**
   Open your browser and navigate to `http://localhost:5173`.

## 🛡️ Default Admin Credentials
To access the admin dashboard, you can log in with:
- **Email:** `admin@mystore.com`
- **Password:** `admin123`