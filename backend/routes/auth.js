const express = require('express');
<<<<<<< HEAD
const router = express.Router();
const User = require('../models/User');
=======
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Ensure env vars like JWT_SECRET are loaded

const router = express.Router();  

// Mock user storage (replace with actual database in production)
let users = [];
let userIdCounter = 1;
>>>>>>> 1edcfe8148775c1a836355ea3974e6f39d977bbd

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, sriPreferences } = req.body;
    
    // Validate required fields
    if (!email || !password || !username) {
      return res.status(400).json({ 
        message: 'Please provide all required fields',
        required: ['username', 'email', 'password']
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      sriPreferences: sriPreferences || []
    });

<<<<<<< HEAD
    await user.save();
=======
    users.push(user);

    // Create token
    const SECRET = process.env.JWT_SECRET;
    if (!SECRET) console.warn("⚠️ WARNING: Using fallback JWT secret in dev mode");

    const token = jwt.sign({ userId: user.id }, SECRET || 'fallback_secret', { expiresIn: '7d' });

>>>>>>> 1edcfe8148775c1a836355ea3974e6f39d977bbd

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        sriPreferences: user.sriPreferences
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Registration failed', 
      error: error.message 
    });
  }
});

<<<<<<< HEAD
module.exports = router;
=======
const auth = { router, users };
module.exports = auth;
>>>>>>> 1edcfe8148775c1a836355ea3974e6f39d977bbd
