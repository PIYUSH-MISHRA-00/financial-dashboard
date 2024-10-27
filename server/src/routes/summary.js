const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const totalVolume = await Transaction.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const totalCount = await Transaction.countDocuments();

    const avgTransaction = await Transaction.aggregate([
      { $group: { _id: null, avg: { $avg: '$amount' } } }
    ]);

    const monthlyTotal = await Transaction.aggregate([
      {
        $match: {
          date: { $gte: new Date(new Date().setDate(1)) } // First day of current month
        }
      },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      total_volume: totalVolume[0]?.total || 0,
      total_count: totalCount,
      avg_transaction: avgTransaction[0]?.avg || 0,
      monthly_total: monthlyTotal[0]?.total || 0
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;