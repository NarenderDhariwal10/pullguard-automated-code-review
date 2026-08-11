const axios = require('axios');
const { addReviewJob } = require('../jobs/reviewJob');

exports.handleWebhook = async (req, res) => {
  try {
    const payload = req.body;
    console.log('Github webhook received');

    if (!payload.pull_request) {
      return res.status(200).send('Ignored');
    }

    if (payload.action !== 'opened') {
      return res.status(200).send('Ignored');
    }

    const owner = payload.repository.owner.login;
    const repo = payload.repository.name;
    const pullNumber = payload.pull_request.number;
    const prTitle = payload.pull_request.title;
    const prUrl = payload.pull_request.html_url;

    // Fetch PR files
    const { data: files } = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/files`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
      }
    );

    if (!files || files.length === 0) {
      return res.status(200).send('No files to review');
    }

    const filesReviewed = files.map((file) => file.filename);
    const filename = files[0]?.filename || null;

    const changedFiles = files
      .filter((file) => file.patch)
      .map(
        (file) => `
========================================
FILE: ${file.filename}
========================================

${file.patch}
`
      );

    if (changedFiles.length === 0) {
      return res.status(200).send('No reviewable code changes');
    }

    const combinedDiff = changedFiles.join('\n');

    const prData = {
      owner,
      repo,
      pull_number: pullNumber,
      title: prTitle,
      prUrl,
      filename,
      filesReviewed,
      code: combinedDiff,
    };

    await addReviewJob(prData);

    return res.status(200).send('Review job added');
  } catch (err) {
    return res.status(500).send('Error');
  }
};