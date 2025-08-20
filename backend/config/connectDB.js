const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const db_uri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectDB;
