const express = require('express');
const Review = require('../models/reviewModel.js');
const { ensureAuth } = require('../middleware/auth.js');
const { fetchUserRepos, getSetupStatus } = require('../services/githubService.js');
const {
  demoReviews,
  demoRepos,
  demoMetrics,
  computeMetrics
} = require('../data/demoData.js');

const router = express.Router();

// ─── Demo endpoints (no auth) 

router.get('/demo/reviews', (req, res) => {
  res.json({ success: true, count: demoReviews.length, reviews: demoReviews });
});

router.get('/demo/reviews/:id', (req, res) => {
  const review = demoReviews.find((r) => r._id === req.params.id);
  if (!review) return res.status(404).json({ success: false, error: 'Review not found' });
  res.json({ success: true, review });
});

router.get('/demo/repos', (req, res) => {
  res.json({ success: true, repos: demoRepos });
});

router.get('/demo/metrics', (req, res) => {
  res.json({ success: true, metrics: demoMetrics });
});

// ─── Config / status 

router.get('/config', (req, res) => {
  const setup = getSetupStatus();
  const publicUrl = setup.publicUrl || `http://localhost:${process.env.PORT}`;
  res.json({
    success: true,
    config: {
      ...setup,
      webhookUrl: `${publicUrl}/webhook/github`,
      isLiveReady: setup.githubToken && setup.openrouterKey
    }
  });
});

// ───Real Live endpoints 

router.get('/metrics', ensureAuth, async (req, res) => {
  try {
    const reviews = await Review.find({ isDemo: false }).lean();
    res.json({ success: true, metrics: computeMetrics(reviews) });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch metrics' });
  }
});

router.get('/reviews', ensureAuth, async (req, res) => {
  try {
    const { repo } = req.query;
    const filter = { isDemo: false, ...(repo ? { repo } : {}) };
    const reviews = await Review.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ success: true, count: reviews.length, reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch reviews' });
  }
});

router.get('/reviews/:id', ensureAuth, async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, isDemo: false }).lean();
    if (!review) return res.status(404).json({ success: false, error: 'Review not found' });
    res.json({ success: true, review });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch review' });
  }
});

router.get('/repos', ensureAuth, async (req, res) => {
  try {
    const token = req.user?.accessToken;
    if (!token) {
      return res.status(400).json({ success: false, error: 'No GitHub token available' });
    }

    const githubRepos = await fetchUserRepos(token);

    const reviewCounts = await Review.aggregate([
      { $match: { isDemo: false } },
      { $group: { _id: '$repo', count: { $sum: 1 } } }
    ]);
    const countMap = Object.fromEntries(reviewCounts.map((r) => [r._id, r.count]));

    const repos = githubRepos.map((repo) => ({
      ...repo,
      reviewCount: countMap[repo.name.split('/').pop()] || countMap[repo.fullName] || 0
    }));

    res.json({ success: true, repos });
  } catch (err) {
    console.error('Error fetching repos:', err.response?.data || err.message);
    res.status(500).json({ success: false, error: 'Failed to fetch repositories' });
  }
});

module.exports = router;
