// config/passport.js
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });

      if (!user) {
        user = new User({
          githubId: profile.id,
          username: profile.username,
          avatarUrl: profile.photos[0]?.value || '',
          accessToken
        });
        await user.save();
      } else {
        user.accessToken = accessToken; // update token
        await user.save();
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);  
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserializing user");
  try {
    const user = await User.findById(id);
    console.log("User found");
    done(null, user);
  } catch (err) {
    console.error("Error in deserializeUser:", err);
    done(err, null);
  }
});

