import { Link } from 'react-router-dom';
import { GitBranch, ExternalLink } from 'lucide-react';

export default function RepoCard({
  repo,
  basePath = '/reviews',
}) {
  const repoName = repo.fullName || repo.name;

  const shortName = repoName.includes('/')
    ? repoName.split('/').pop()
    : repoName;

  const isPrivate = repo.visibility === 'private';
  const isActive = repo.status === 'active';

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body p-4">

        {/* Repository header */}
        <div className="d-flex align-items-start justify-content-between gap-2 mb-3">

          <div className="d-flex align-items-center gap-2 min-width-0">
            <GitBranch
              size={20}
              className="text-primary flex-shrink-0"
            />

            <h3
              className="h6 fw-semibold mb-0 text-truncate"
              title={repoName}
            >
              {repoName}
            </h3>
          </div>

          {/* Visibility */}
          <span
            className={`badge ${
              isPrivate
                ? 'text-bg-light border text-secondary'
                : 'text-bg-success'
            }`}
          >
            {isPrivate ? 'Private' : 'Public'}
          </span>

        </div>

        {/* Repository URL */}
        {repo.html_url && (
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="small text-secondary text-decoration-none d-inline-flex align-items-center gap-1 mb-3"
          >
            View repository
            <ExternalLink size={13} />
          </a>
        )}

        {/* Review count */}
        <div className="bg-light rounded p-3 mb-3">
          <div className="small text-secondary">
            Reviews
          </div>

          <div className="fs-4 fw-bold text-dark">
            {repo.reviewCount || 0}
          </div>
        </div>

        {/* Footer */}
        <div className="d-flex align-items-center justify-content-between">

          <Link
            to={`${basePath}?repo=${encodeURIComponent(shortName)}`}
            className="btn btn-sm btn-outline-primary"
          >
            View reviews
          </Link>

          {/* Status */}
          <span
            className={`badge ${
              isActive
                ? 'text-bg-success'
                : 'text-bg-light border text-secondary'
            }`}
          >
            {isActive ? 'Active' : 'Inactive'}
          </span>

        </div>

      </div>
    </div>
  );
}