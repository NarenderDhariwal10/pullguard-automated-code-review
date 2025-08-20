const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../controllers/reviewController');

router.post('/github', handleWebhook);

module.exports = router;