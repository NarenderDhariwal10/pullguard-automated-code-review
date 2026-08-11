const demoReviews = [
  {
    _id: 'demo-1',
    prNumber: 42,
    prTitle: 'Add rate limiting to public API endpoints',
    prUrl: 'https://github.com/acme-corp/api-gateway/pull/42',
    repo: 'api-gateway',
    owner: 'acme-corp',
    fullName: 'acme-corp/api-gateway',
    status: 'completed',
    summary: 'Rate limiting implementation is well-structured. Redis-backed sliding window is appropriate. Minor concerns around error handling for Redis connection failures.',
    overallScore: 88,
    recommendation: 'approve_with_suggestions',
    issues: [
      { severity: 'LOW', category: 'best-practices', title: 'Missing Redis retry logic', description: 'No fallback when Redis is unavailable.', suggestedFix: 'Add circuit breaker pattern with in-memory fallback.' },
      { severity: 'LOW', category: 'maintainability', title: 'Magic numbers in config', description: 'Rate limits hardcoded in middleware.', suggestedFix: 'Move limits to environment variables.' }
    ],
    categoryScores: { security: 92, performance: 88, maintainability: 85, bestPractices: 87 },
    issueCounts: { high: 0, medium: 0, low: 2 },
    isDemo: true,
    createdAt: '2026-03-08T10:30:00.000Z'
  },
  {
    _id: 'demo-2',
    prNumber: 17,
    prTitle: 'Optimize database queries for dashboard',
    prUrl: 'https://github.com/acme-corp/analytics-service/pull/17',
    repo: 'analytics-service',
    owner: 'acme-corp',
    fullName: 'acme-corp/analytics-service',
    status: 'completed',
    summary: 'Query optimization reduces N+1 patterns effectively. Index additions are appropriate. Consider adding query timeout guards for large datasets.',
    overallScore: 78,
    recommendation: 'approve_with_suggestions',
    issues: [
      { severity: 'MEDIUM', category: 'performance', title: 'Unbounded aggregation query', description: 'Dashboard query lacks LIMIT on date range.', suggestedFix: 'Add max date range parameter with default of 30 days.' },
      { severity: 'MEDIUM', category: 'maintainability', title: 'Raw SQL in service layer', description: 'Complex query embedded in controller.', suggestedFix: 'Extract to repository pattern with named query.' },
      { severity: 'LOW', category: 'best-practices', title: 'Missing query logging', description: 'Slow queries not logged for monitoring.', suggestedFix: 'Add query duration logging above 500ms threshold.' }
    ],
    categoryScores: { security: 90, performance: 72, maintainability: 75, bestPractices: 80 },
    issueCounts: { high: 0, medium: 2, low: 1 },
    isDemo: true,
    createdAt: '2026-03-07T14:15:00.000Z'
  },
  {
    _id: 'demo-3',
    prNumber: 8,
    prTitle: 'Add user authentication middleware',
    prUrl: 'https://github.com/acme-corp/api-gateway/pull/8',
    repo: 'api-gateway',
    owner: 'acme-corp',
    fullName: 'acme-corp/api-gateway',
    status: 'completed',
    summary: 'Auth middleware covers JWT validation but has critical gaps in token refresh and secret management that need addressing before merge.',
    overallScore: 62,
    recommendation: 'needs_changes',
    issues: [
      { severity: 'HIGH', category: 'security', title: 'JWT secret in source code', description: 'Hardcoded JWT secret found in middleware file.', suggestedFix: 'Move to environment variable immediately.' },
      { severity: 'HIGH', category: 'security', title: 'No token expiry validation', description: 'Expired tokens accepted without check.', suggestedFix: 'Add exp claim validation in verify step.' },
      { severity: 'MEDIUM', category: 'security', title: 'Missing rate limit on auth endpoint', description: 'Login endpoint has no brute-force protection.', suggestedFix: 'Add rate limiting to /auth/login route.' },
      { severity: 'LOW', category: 'best-practices', title: 'Inconsistent error messages', description: 'Auth errors leak internal details.', suggestedFix: 'Return generic 401 messages to clients.' }
    ],
    categoryScores: { security: 45, performance: 80, maintainability: 70, bestPractices: 65 },
    issueCounts: { high: 2, medium: 1, low: 1 },
    isDemo: true,
    createdAt: '2026-03-06T09:00:00.000Z'
  }
];

const demoRepos = [
  {
    id: 'acme-corp/api-gateway',
    name: 'acme-corp/api-gateway',
    fullName: 'acme-corp/api-gateway',
    visibility: 'public',
    status: 'active',
    reviewCount: 12,
    html_url: 'https://github.com/acme-corp/api-gateway'
  },
  {
    id: 'acme-corp/analytics-service',
    name: 'acme-corp/analytics-service',
    fullName: 'acme-corp/analytics-service',
    visibility: 'private',
    status: 'active',
    reviewCount: 8,
    html_url: 'https://github.com/acme-corp/analytics-service'
  },
  {
    id: 'acme-corp/frontend-app',
    name: 'acme-corp/frontend-app',
    fullName: 'acme-corp/frontend-app',
    visibility: 'public',
    status: 'inactive',
    reviewCount: 3,
    html_url: 'https://github.com/acme-corp/frontend-app'
  }
];

function computeMetrics(reviews) {
  const total = reviews.length;
  const avgScore = total
    ? Math.round(reviews.reduce((s, r) => s + r.overallScore, 0) / total)
    : 0;
  const highIssues = reviews.reduce((s, r) => s + (r.issueCounts?.high || 0), 0);
  const severityBreakdown = {
    high: reviews.reduce((s, r) => s + (r.issueCounts?.high || 0), 0),
    medium: reviews.reduce((s, r) => s + (r.issueCounts?.medium || 0), 0),
    low: reviews.reduce((s, r) => s + (r.issueCounts?.low || 0), 0)
  };
  const repos = new Set(reviews.map(r => r.repo)).size;

  return { totalReviews: total, avgScore, highIssues, repositories: repos, severityBreakdown };
}

module.exports = {
  demoReviews,
  demoRepos,
  computeMetrics,
  demoMetrics: computeMetrics(demoReviews)
};
