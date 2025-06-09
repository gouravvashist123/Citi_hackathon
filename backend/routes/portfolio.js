const express = require('express');
const router = express.Router();
const Port = require('../models/Port');

// Get user's portfolio
router.get('/:userId', async (req, res) => {
  try {
    const portfolio = await Port.findOne({ user: req.params.userId });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add holding to portfolio
router.post('/:userId/holdings', async (req, res) => {
  try {
    const { symbol, shares, purchasePrice } = req.body;
    
    let portfolio = await Port.findOne({ user: req.params.userId });
    
    if (!portfolio) {
      portfolio = new Port({
        user: req.params.userId,
        holdings: []
      });
    }

    portfolio.holdings.push({
      symbol,
      shares,
      purchasePrice,
      purchaseDate: new Date()
    });

    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;