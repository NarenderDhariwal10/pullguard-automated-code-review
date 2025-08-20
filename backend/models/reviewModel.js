const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  prNumber: Number,
  repo: String,
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', reviewSchema);
