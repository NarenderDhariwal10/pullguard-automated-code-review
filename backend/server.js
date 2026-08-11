const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB.js');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

dotenv.config();
require('./config/passportConfig');

const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const webhookRoutes = require('./routes/webhookRoutes');

const app = express();
const PORT = process.env.PORT || 3008;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(cors({
  origin: [FRONTEND_URL],
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'pullguard-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/api', reviewRoutes);
app.use('/webhook', webhookRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'PullGuard API is running' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const startApp = async () => {
  await connectDB();
  require('./workers/queueWorker');
  app.listen(PORT, () => {
    console.log(`PullGuard API running on http://localhost:${PORT}`);
  });
};

startApp();
