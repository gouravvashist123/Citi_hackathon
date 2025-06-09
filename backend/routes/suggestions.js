const express = require('express');
const router = express.Router();

// Mock investment suggestions based on SRI preferences
const suggestions = {
  'Green Tech': [
    { symbol: 'TSLA', name: 'Tesla Inc.', reason: 'Leading electric vehicle manufacturer', impact: '🌱 Zero emissions transport' },
    { symbol: 'NEE', name: 'NextEra Energy', reason: 'Renewable energy leader', impact: '⚡ Clean energy generation' },
    { symbol: 'ENPH', name: 'Enphase Energy', reason: 'Solar energy solutions', impact: '☀️ Solar power innovation' }
  ],
  'Women-led Companies': [
    { symbol: 'AMD', name: 'Advanced Micro Devices', reason: 'Led by Dr. Lisa Su', impact: '👩‍💼 Women leadership in tech' },
    { symbol: 'GM', name: 'General Motors', reason: 'Led by Mary Barra', impact: '🚗 Automotive innovation' },
    { symbol: 'YUM', name: 'Yum! Brands', reason: 'Strong female leadership', impact: '🍽️ Food service diversity' }
  ],
  'Sustainable Energy': [
    { symbol: 'ICLN', name: 'iShares Clean Energy ETF', reason: 'Diversified clean energy', impact: '🔋 Renewable energy portfolio' },
    { symbol: 'FSLR', name: 'First Solar', reason: 'Solar panel manufacturing', impact: '☀️ Solar technology leader' }
  ],
  'Clean Water': [
    { symbol: 'AWK', name: 'American Water Works', reason: 'Water utility services', impact: '💧 Clean water access' },
    { symbol: 'XYL', name: 'Xylem Inc.', reason: 'Water technology solutions', impact: '🌊 Water infrastructure' }
  ],
  'Social Impact': [
    { symbol: 'BYND', name: 'Beyond Meat', reason: 'Sustainable protein alternatives', impact: '🌱 Reducing meat consumption impact' },
    { symbol: 'ZM', name: 'Zoom', reason: 'Remote work enablement', impact: '💻 Reducing carbon footprint' }
  ]
};

// Get AI-based suggestions
router.get('/', (req, res) => {
  try {
    // Mock user preferences (in real app, get from authenticated user)
    const userPreferences = req.query.preferences ? req.query.preferences.split(',') : ['Green Tech', 'Social Impact'];
    
    let personalizedSuggestions = [];
    
    userPreferences.forEach(preference => {
      if (suggestions[preference]) {
        personalizedSuggestions = [...personalizedSuggestions, ...suggestions[preference]];
      }
    });

    // Remove duplicates and limit to 6 suggestions
    const uniqueSuggestions = personalizedSuggestions
      .filter((suggestion, index, self) => 
        index === self.findIndex(s => s.symbol === suggestion.symbol)
      )
      .slice(0, 6);

    res.json({
      message: 'AI-powered suggestions based on your SRI preferences',
      suggestions: uniqueSuggestions,
      totalSuggestions: uniqueSuggestions.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;