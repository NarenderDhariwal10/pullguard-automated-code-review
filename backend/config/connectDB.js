const dns = require('dns');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

dns.setServers(['1.1.1.1', '8.8.8.8']);


const db_uri = process.env.MONGO_URI;

if (!db_uri) {
  throw new Error('Missing MONGO_URI environment variable. Please add it to .env.');
}

const connectDB = async () => {
  try {
    await mongoose.connect(db_uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;