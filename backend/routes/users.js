const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Register user
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json({ _id: savedUser._id, name: savedUser.name, email: savedUser.email });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
