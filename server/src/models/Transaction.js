const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true
  },
  status: {
    type: String,
    enum: ['successful', 'pending', 'failed'],
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);