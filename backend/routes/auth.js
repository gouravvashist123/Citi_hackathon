const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Ensure env vars like JWT_SECRET are loaded

const router = express.Router();  

// Mock user storage (replace with actual database in production)
let users = [];
let userIdCounter = 1;

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, sriPreferences } = req.body;

    // Check if user exists
    const existingUser = users.find(u => u.email === email || u.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = {
      id: userIdCounter++,
      username,
      email,
      password: hashedPassword,
      sriPreferences: sriPreferences || [],
      followedInvestors: [],
      createdAt: new Date()
    };

    users.push(user);

    // Create token
    const SECRET = process.env.JWT_SECRET;
    if (!SECRET) console.warn("⚠️ WARNING: Using fallback JWT secret in dev mode");

    const token = jwt.sign({ userId: user.id }, SECRET || 'fallback_secret', { expiresIn: '7d' });


    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        sriPreferences: user.sriPreferences
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        sriPreferences: user.sriPreferences
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

const auth = { router, users };
module.exports = auth;
