const axios = require('axios');
require('dotenv').config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function generateReview(code, filename) {
    console.log(`2. Generating AI review for file: ${filename}`);

    const endpoint = 'https://openrouter.ai/api/v1/chat/completions';

    const headers = {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3008',
        'X-Title': 'PullGuard'
    };

    const data = {
        model: 'anthropic/claude-sonnet-4',
        messages: [
            {
                role: 'system',
                content: `
You are a Senior Software Engineer reviewing a GitHub Pull Request.

Analyze the code for:

1. Bugs and logical errors
2. Security vulnerabilities
3. Performance issues
4. Code quality and maintainability
5. Best practices

Return feedback in this format:

## Summary

## Issues Found

### [HIGH]
- Issue
- Why it matters
- Suggested fix

### [MEDIUM]
- Issue
- Why it matters
- Suggested fix

### [LOW]
- Issue
- Why it matters
- Suggested fix

## Overall Recommendation
(Approve / Needs Changes)
`
            },
            {
                role: 'user',
                content: `
File: ${filename}

Code:

\`\`\`
${code}
\`\`\`

Review this code thoroughly and provide actionable feedback.
`
            }
        ],
        temperature: 0.2,
        max_tokens: 2000
    };

    try {
        console.log('3. Sending request to OpenRouter...');

        const response = await axios.post(
            endpoint,
            data,
            { headers }
        );

        console.log('4. AI response received');

        return (
            response.data?.choices?.[0]?.message?.content ||
            'No review generated'
        );
    } catch (err) {
        console.error(
            'AI API call failed:',
            err.response?.data || err.message
        );

        return `Error generating review: ${
            err.response?.data?.error?.message || err.message
        }`;
    }
}

module.exports = {
    generateReview
};