const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password) return res.status(400).json({ msg: 'Missing fields' });

  let user = await User.findOne({ email });
  if(user) return res.status(400).json({ msg:'User already exists' });

  user = new User({ name, email, password });
  await user.save();
  res.json({ msg: 'Registered successfully', user });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if(!user) return res.status(400).json({ msg:'Invalid credentials' });
  res.json({ msg:'Login successful', user });
});

module.exports = router;
