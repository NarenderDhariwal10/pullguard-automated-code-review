const { Queue } = require('bullmq');
const { redisOptions } = require('../utils/helpers');

const reviewQueue = new Queue('reviewQueue', { connection: redisOptions });

module.exports = reviewQueue;
