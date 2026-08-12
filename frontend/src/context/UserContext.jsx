import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser._id) {
        // Invalid or old fake session, log them out
        localStorage.removeItem("isUserLoggedIn");
        localStorage.removeItem("currentUser");
        setUser(null);
        setWishlist([]);
      } else {
        setUser(parsedUser);
        fetchWishlist(parsedUser._id, parsedUser.token);
      }
    }
  }, []);

  const fetchWishlist = async (userId, token) => {
    try {
      const res = await fetch(`${API_URL}/users/${userId}/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setWishlist(data); // Array of populated products or ids
      }
    } catch (err) {
      console.error('Error fetching wishlist', err);
    }
  };

  const toggleWishlist = async (productId) => {
    if (!user || !user._id || !user.token) {
      alert("Please log in to save items to your wishlist.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/users/${user._id}/wishlist`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ productId })
      });
      if (res.ok) {
        const data = await res.json();
        setWishlist(data); // API returns updated array of objectIds
      }
    } catch (err) {
      console.error('Error toggling wishlist', err);
    }
  };

  const loginUser = (userData) => {
    localStorage.setItem("isUserLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setUser(userData);
    if (userData._id) {
      fetchWishlist(userData._id, userData.token);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("isUserLoggedIn");
    localStorage.removeItem("currentUser");
    setUser(null);
    setWishlist([]);
  };

  return (
    <UserContext.Provider value={{ user, wishlist, toggleWishlist, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
