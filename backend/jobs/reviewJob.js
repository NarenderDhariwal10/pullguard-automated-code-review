const reviewQueue = require('../queues/reviewQueue');

exports.addReviewJob = async (data) => {
    console.log("Queueing review job with data:");
    await reviewQueue.add('review', data);
    console.log("Job successfully added to BullMQ queue");
};
