require('dotenv').config();
const axios = require('axios');

exports.commentOnPR = async ({ owner, repo, pull_number }, body) => {
    console.log(`Posting comment to PR #${pull_number} in ${owner}/${repo}...`);

    try {
        await axios.post(
            `https://api.github.com/repos/${owner}/${repo}/issues/${pull_number}/comments`,
            { body },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                    Accept: 'application/vnd.github+json'
                }
            }
        );
        console.log("6. Comment posted successfully");
    } catch (err) {
        console.error("Error posting comment to GitHub:", err.response?.data || err.message);
    }
};
