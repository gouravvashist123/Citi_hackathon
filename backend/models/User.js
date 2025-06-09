const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  sriPreferences: [{
    type: String,
    enum: ['Green Tech', 'Women-led Companies', 'Sustainable Energy', 'Clean Water', 'Social Impact', 'ESG Focused']
  }],
  followedInvestors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);