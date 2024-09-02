const express = require('express');
const router = express.Router();
const User = require('../models/client');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login request:', req.body);

    // Find user by email
    const user = await User.findOne({ email });

    console.log('User found:', user);

    // If user not found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password (Assuming passwords are stored as plaintext)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If everything is correct, send success response
    res.status(200).json({ message: 'Login successful', user });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;