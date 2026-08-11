require('dotenv').config();
const axios = require('axios');

const githubHeaders = (token) => ({
  Authorization: `Bearer ${token || process.env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28'
});

exports.commentOnPR = async ({ owner, repo, pull_number }, body) => {
  console.log(`Posting comment to PR`);

  const response = await axios.post(
    `https://api.github.com/repos/${owner}/${repo}/issues/${pull_number}/comments`,
    { body },
    { headers: githubHeaders() }
  );

  
  return response.data;
};

exports.fetchUserRepos = async (accessToken) => {
  const { data } = await axios.get('https://api.github.com/user/repos', {
    headers: githubHeaders(accessToken),
    params: { sort: 'updated', per_page: 100, affiliation: 'owner,collaborator' }
  });

  return data.map((repo) => ({
    id: repo.full_name,
    name: repo.full_name,
    fullName: repo.full_name,
    visibility: repo.private ? 'private' : 'public',
    defaultBranch: repo.default_branch,
    html_url: repo.html_url,
    status: 'active'
  }));
};

exports.getSetupStatus = () => ({
  githubToken: Boolean(process.env.GITHUB_TOKEN),
  githubOAuth: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
  openrouterKey: Boolean(process.env.OPENROUTER_API_KEY),
  webhookSecret: Boolean(process.env.WEBHOOK_SECRET),
  publicUrl: process.env.PUBLIC_URL || null
});
