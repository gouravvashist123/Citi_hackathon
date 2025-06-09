const mongoose = require('mongoose');

const PortSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  holdings: [
    {
      symbol: { type: String, required: true }, // e.g., 'TSLA'
      shares: { type: Number, required: true },
      purchaseDate: { type: Date, default: Date.now },
      purchasePrice: { type: Number, required: true }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Port', PortSchema);