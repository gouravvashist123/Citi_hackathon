const mongoose = require('mongoose');

const InvestorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  bio: String,
  avatar: String,
  specialties: [String],
  followers: {
    type: Number,
    default: 0
  },
  totalInvestments: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Investor', InvestorSchema);