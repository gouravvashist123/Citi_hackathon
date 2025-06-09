const mongoose = require('mongoose');

const PortSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  holdings: [{
    symbol: {
      type: String,
      required: true
    },
    shares: {
      type: Number,
      required: true
    },
    purchasePrice: {
      type: Number,
      required: true
    },
    purchaseDate: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Port', PortSchema);