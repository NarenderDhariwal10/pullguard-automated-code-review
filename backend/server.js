
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB.js');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

dotenv.config();

// Configure Passport strategies and serialization
require('./config/passportConfig');

const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const webhookRoutes = require('./routes/webhookRoutes');

const app = express();
const PORT = process.env.PORT || 3008;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Render runs behind a reverse proxy.
// Required for secure cookies when using HTTPS.
app.set('trust proxy', 1);

// CORS: allow the frontend origin to make credentialed requests.
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true
  })
);

// Parse JSON request bodies.
app.use(express.json());

// Session middleware must run before Passport.
app.use(
  session({
    name: 'connect.sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  })
);

// Passport authentication and session restoration.
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api', reviewRoutes);
app.use('/webhook', webhookRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'PullGuard API is running'
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found'
  });
});

// Start the application
const startApp = async () => {
  try {
    if (!process.env.SESSION_SECRET) {
      throw new Error('SESSION_SECRET is missing from environment variables');
    }

    if (!FRONTEND_URL) {
      throw new Error('FRONTEND_URL is missing from environment variables');
    }

    await connectDB();

    // Start background queue worker
    require('./workers/queueWorker');

    app.listen(PORT, () => {
      console.log(`PullGuard API running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start PullGuard API:', error);
    process.exit(1);
  }
};

startApp();
