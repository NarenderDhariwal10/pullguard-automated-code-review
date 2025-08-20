const axios = require('axios');
const { addReviewJob } = require('../jobs/reviewJob');
exports.handleWebhook = async (req, res) => {
  try {
    console.log("📩 Incoming webhook payload:");

    const payload = req.body;

    if (payload.action === 'opened' && payload.pull_request) {
      const { owner, name: repo } = payload.repository;
      const pull_number = payload.pull_request.number;

      // Get changed files from GitHub API
      const { data: files } = await axios.get(
        `https://api.github.com/repos/${owner.login}/${repo}/pulls/${pull_number}/files`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: 'application/vnd.github+json'
          }
        }
      );

      if (!files.length) {
        console.log(" No files found in PR.");
        return res.status(200).send('No files to review');
      }

      // Example: process first file
      const firstFile = files[0];
      const rawFileContent = await axios.get(firstFile.raw_url);

      const prData = {
        owner: owner.login,
        repo,
        pull_number,
        filename: firstFile.filename,
        code: rawFileContent.data
      };

      console.log("Adding job to review queue:");
      await addReviewJob(prData);

    } else {
      console.log(`Webhook ignored. Action: ${payload.action}`);
    }

    res.status(200).send('Received');
  } catch (err) {
    console.error("Error handling webhook:", err.response?.data || err.message);
    res.status(500).send('Error');
  }
};
