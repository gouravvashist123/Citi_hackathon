const express = require('express');
const router = express.Router();
const Investor = require('../models/Investor');

// Get all investors
router.get('/', async (req, res) => {
  try {
    const investors = await Investor.find();
    res.json(investors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create investor
router.post('/', async (req, res) => {
  try {
    const investor = new Investor(req.body);
    await investor.save();
    res.status(201).json(investor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;