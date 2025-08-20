const express = require('express');
const Review = require('../models/reviewModel');

const router = express.Router();

//Get all reviews
router.get('/reviews', async (req, res) => {
  try {
    const { repo } = req.query;
    const filter = repo ? { repo } : {};
    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

//Get review by id
router.get('/reviews/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Not found' });
    res.json(review);
  } catch (err) {
    console.error('Error fetching review by id:', err);
    res.status(500).json({ error: 'Failed to fetch review' });
  }
});

//Get all repos
router.get('/repos', async (req, res) => {
  try {
    const names = await Review.distinct('repo');
    
    const repos = names.map((name, i) => ({
      id: name,             
      name,
      defaultBranch: 'main' 
    }));
    res.json(repos);
  } catch (err) {
    console.error('Error fetching repos:', err);
    res.status(500).json({ error: 'Failed to fetch repos' });
  }
});

module.exports = router;
