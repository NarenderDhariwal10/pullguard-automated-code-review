const express = require('express');
const passport = require('passport');

const router = express.Router();

// GitHub OAuth login
router.get('/github', passport.authenticate('github', { scope: ['repo'] }));

// Callback after GitHub authentication
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    console.log("✅ User authenticated:", req.user);
    res.redirect('http://localhost:5173/dashboard'); // Send back to React
  }
);


// Logout user
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send(err);
    res.redirect('/');
  });
});

// Current user info
router.get('/me', (req, res) => {
  console.log("Session data:", req.session);
  console.log("User in request:", req.user);
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.json(req.user);
});



module.exports = router;
