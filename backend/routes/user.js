const express = require('express');
const router = express.Router();
const { users } = require('./auth');
const { investors } = require('./investors');

// Mock posts data
const posts = [
  {
    id: 1,
    investorId: 1,
    content: 'Just invested in Tesla - fighting carbon emissions one EV at a time! 🚗⚡',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 45,
    stock: 'TSLA'
  },
  {
    id: 2,
    investorId: 2,
    content: 'Excited to support another women-led startup in clean tech! The future is female 👩‍💼🌱',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    likes: 67,
    stock: null
  },
  {
    id: 3,
    investorId: 4,
    content: 'Clean energy portfolio performing exceptionally well this quarter. NEE and ENPH leading the charge! 📈',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    likes: 89,
    stock: 'NEE'
  },
  {
    id: 4,
    investorId: 3,
    content: 'Water scarcity is real. Investing in companies that solve this crisis. Check out XYL! 💧',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    likes: 34,
    stock: 'XYL'
  }
];

// Get user feed
router.get('/feed', (req, res) => {
  try {
    const userId = req.user?.userId || 1; // Mock auth for demo
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get posts from followed investors
    const feedPosts = posts
      .filter(post => user.followedInvestors.includes(post.investorId))
      .map(post => {
        const investor = investors.find(i => i.id === post.investorId);
        return {
          ...post,
          investor: investor
        };
      })
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json({
      posts: feedPosts,
      totalPosts: feedPosts.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user preferences
router.put('/preferences', (req, res) => {
  try {
    const userId = req.user?.userId || 1; // Mock auth for demo
    const { sriPreferences } = req.body;
    
    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.sriPreferences = sriPreferences;
    
    res.json({
      message: 'Preferences updated successfully',
      sriPreferences: user.sriPreferences
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;