const express = require('express');
const router = express.Router();
const { users } = require('./auth');

// Mock investors data
const investors = [
  {
    id: 1,
    name: 'Sarah Green',
    username: 'greenGuru',
    bio: 'ESG investment specialist focusing on clean energy and sustainable tech',
    avatar: '🌱',
    specialties: ['Green Tech', 'Sustainable Energy', 'ESG Focused'],
    followers: 15420,
    totalInvestments: 89,
    isVerified: true
  },
  {
    id: 2,
    name: 'Impact Queen',
    username: 'impactQueen',
    bio: 'Championing women-led startups and social impact investing',
    avatar: '👑',
    specialties: ['Women-led Companies', 'Social Impact'],
    followers: 12800,
    totalInvestments: 67,
    isVerified: true
  },
  {
    id: 3,
    name: 'Clean Water Dave',
    username: 'waterWarrior',
    bio: 'Investing in clean water solutions and environmental restoration',
    avatar: '💧',
    specialties: ['Clean Water', 'Environmental'],
    followers: 8900,
    totalInvestments: 45,
    isVerified: false
  },
  {
    id: 4,
    name: 'Tech4Good',
    username: 'tech4good',
    bio: 'Technology investments that create positive social impact',
    avatar: '🚀',
    specialties: ['Green Tech', 'Social Impact'],
    followers: 22100,
    totalInvestments: 156,
    isVerified: true
  }
];

// Get all investors
router.get('/', (req, res) => {
  res.json(investors);
});

// Follow/Unfollow investor
router.post('/:investorId/follow', (req, res) => {
  try {
    const { investorId } = req.params;
    const userId = req.user?.userId || 1; // Mock auth for demo
    
    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const investor = investors.find(i => i.id === parseInt(investorId));
    if (!investor) {
      return res.status(404).json({ message: 'Investor not found' });
    }

    const isFollowing = user.followedInvestors.includes(parseInt(investorId));
    
    if (isFollowing) {
      // Unfollow
      user.followedInvestors = user.followedInvestors.filter(id => id !== parseInt(investorId));
      investor.followers--;
      res.json({ message: 'Unfollowed successfully', following: false });
    } else {
      // Follow
      user.followedInvestors.push(parseInt(investorId));
      investor.followers++;
      res.json({ message: 'Followed successfully', following: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
module.exports.investors = investors;