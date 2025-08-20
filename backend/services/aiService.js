const axios = require('axios');
require('dotenv').config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function generateReview(code, filename) {
    console.log(`2. Generating AI review for file: ${filename}`);

    const endpoint = 'https://openrouter.ai/api/v1/chat/completions';
    const headers = {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost'
    };

    const data = {
        model: 'mistralai/mistral-7b-instruct',
        messages: [
            {
                role: 'user',
                content: `You are an experienced code reviewer. Review the following code and suggest improvements, bugs, and best practices in a concise bullet point format. Mention file: ${filename} and code ${code}.`
            }
        ]
    };

    try {
        console.log("3. Sending request to OpenRouter AI...");
        const response = await axios.post(endpoint, data, { headers });
        console.log("4. AI response received");
        const message = response.data.choices?.[0]?.message?.content;
        return message?.trim() || 'No content in response';
    } catch (err) {
        console.error('AI API call failed:', err.response?.data || err.message);
        return 'Error getting AI feedback';
    }
}

module.exports = { generateReview };
