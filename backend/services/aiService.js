const axios = require('axios');
require('dotenv').config();
const PORT = process.env.PORT;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function generateReview(code, filename) {
    

    const endpoint =
        'https://openrouter.ai/api/v1/chat/completions';

    const headers = {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:`{$PORT}`',
        'X-Title': 'PullGuard'
    };

    const data = {
        model: 'anthropic/claude-sonnet-4',

        messages: [
            {
                role: 'system',
                content: `
You are PullGuard, an expert senior software engineer.

Review the GitHub Pull Request code for:
- security
- bugs
- performance
- maintainability
- best practices

Return ONLY valid JSON.

Use exactly:

{
  "summary": "short review summary",
  "overallScore": 88,
  "recommendation": "approve",
  "categoryScores": {
    "security": 92,
    "performance": 85,
    "maintainability": 88,
    "bestPractices": 86
  },
  "issues": [
    {
      "severity": "LOW",
      "category": "best-practices",
      "title": "short title",
      "description": "brief explanation",
      "suggestedFix": "brief actionable fix"
    }
  ]
}

Rules:

overallScore:
0-59 = serious problems
60-69 = significant problems
70-79 = acceptable with improvements
80-89 = good
90-100 = excellent

severity:
HIGH = critical security issue, serious bug, data loss or breaking behavior
MEDIUM = important bug, performance or maintainability problem
LOW = minor improvement or best-practice suggestion

recommendation must be:
"approve"
"approve_with_suggestions"
"needs_changes"

category must be:
"security"
"performance"
"maintainability"
"best-practices"

Maximum 6 important issues.

Keep descriptions and fixes concise.

If there are no significant issues:
"issues": []

Do not return Markdown.
Do not return code fences.
Do not return text outside JSON.
`
            },

            {
                role: 'user',
                content: `
File: ${filename}

Review this Pull Request code:

${code}
`
            }
        ],

        temperature: 0.1,

        // low because OpenRouter credit limit
        max_tokens: 1000
    };

    try {
        

        const response = await axios.post(
            endpoint,
            data,
            { headers }
        );

        console.log('AI responsed');

        const rawContent =
            response.data?.choices?.[0]?.message?.content;

        if (!rawContent) {
            throw new Error('AI returned empty response');
        }

        const cleanedContent = rawContent
            .replace(/^```json\s*/i, '')
            .replace(/^```\s*/i, '')
            .replace(/\s*```$/i, '')
            .trim();

        let review;

        try {
            review = JSON.parse(cleanedContent);
        } catch (error) {
            console.error('Invalid AI JSON:');
            console.error(rawContent);

            throw new Error('AI returned invalid JSON');
        }

        // Basic validation
        if (
            typeof review.summary !== 'string' ||
            typeof review.overallScore !== 'number' ||
            typeof review.recommendation !== 'string' ||
            !review.categoryScores ||
            !Array.isArray(review.issues)
        ) {
            throw new Error(
                'AI response has invalid structure'
            );
        }

        // Keep score valid
        review.overallScore = Math.max(
            0,
            Math.min(100, review.overallScore)
        );

        // Maximum six issues
        review.issues = review.issues.slice(0, 6);

        

        return review;

    } catch (err) {

        console.error(
            'AI API call failed:',
            err.response?.data || err.message
        );

        throw new Error(
            err.response?.data?.error?.message ||
            err.message ||
            'Failed to generate AI review'
        );
    }
}

module.exports = {
    generateReview
};