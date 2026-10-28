
const express = require('express');
const passport = require('passport');

const router = express.Router();
const FRONTEND_URL = process.env.FRONTEND_URL;

router.get(
  '/github',
  passport.authenticate('github', { scope: ['repo'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: `${FRONTEND_URL}/login?error=auth_failed`
  }),
  (req, res, next) => {
    if (!req.user) {
      return res.redirect(`${FRONTEND_URL}/login?error=no_user`);
    }

    req.session.save((err) => {
      if (err) {
        console.error('OAuth session save failed:', err);
        return next(err);
      }

      console.log('OAuth session saved successfully');
      return res.redirect(`${FRONTEND_URL}/dashboard`);
    });
  }
);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((sessionErr) => {
      if (sessionErr) return next(sessionErr);
      res.clearCookie('connect.sid');
      res.redirect(`${FRONTEND_URL}/`);
    });
  });
});

router.get('/me', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  res.json({
    id: req.user._id,
    username: req.user.username,
    avatarUrl: req.user.avatarUrl,
    githubId: req.user.githubId
  });
});

module.exports = router;
