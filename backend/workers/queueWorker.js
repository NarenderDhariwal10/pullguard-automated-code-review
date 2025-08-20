require('dotenv').config({ path: __dirname + '/../.env' }); 
const { Worker } = require('bullmq');
const { generateReview } = require('../services/aiService');
const { commentOnPR } = require('../services/githubService');
const connectDB = require('../config/connectDB');
const Review = require('../models/reviewModel');
connectDB();

new Worker(
    'reviewQueue',
    async job => {
        console.log(`1. Processing job ID: ${job.id} with data`);

        const comment = await generateReview(job.data.code || '', job.data.filename || 'Unknown');
        console.log(`5. Generated review comment`);

        try {
            await commentOnPR(job.data, comment);

            // Save to DB
            const reviewDoc = new Review({
                prNumber: job.data.pull_number,
                repo: job.data.repo,
                comment
            });
            await reviewDoc.save();
            console.log("7. Review saved to DB");
        } catch (err) {
            console.error("Error during comment or DB save:", err.response?.data || err.message);
        }
    },
    {
        connection: require('../utils/helpers').redisOptions
    }
);
