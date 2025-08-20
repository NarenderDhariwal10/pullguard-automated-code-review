const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

dotenv.config();
require('./config/passportConfig'); // GitHub OAuth setup

const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const webhookRoutes = require('./routes/webhookRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use(express.json());


app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    httpOnly: true,
    sameSite: 'lax'
  }
}));


app.use(passport.initialize());
app.use(passport.session());

connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/api', reviewRoutes);
app.use('/webhook', webhookRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
