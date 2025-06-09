const express = require('express');
const router = express.Router();

// Get suggestions
router.get('/', (req, res) => {
  try {
    const suggestions = [
      { symbol: 'TSLA', name: 'Tesla Inc.', reason: 'Leading electric vehicle manufacturer' },
      { symbol: 'NEE', name: 'NextEra Energy', reason: 'Renewable energy leader' }
    ];
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;