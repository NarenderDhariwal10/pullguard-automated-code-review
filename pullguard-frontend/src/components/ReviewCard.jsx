import { Link } from 'react-router-dom';
import ScoreRing from './ScoreRing';

function SeverityBadge({ label, count, color }) {
  const colors = {
    high: 'text-bg-danger',
    medium: 'text-bg-warning',
    low: 'text-bg-primary',
  };

  return (
    <span className={`badge ${colors[color]}`}>
      {count} {label}
    </span>
  );
}

export default function ReviewCard({
  review,
  basePath = '/reviews',
}) {
  const repoLabel =
    review.fullName ||
    `${review.owner}/${review.repo}`;

  return (
    <Link
      to={`${basePath}/${review._id}`}
      className="card h-100 shadow-sm border-0 text-decoration-none text-dark"
    >
      <div className="card-body p-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">

          <div className="min-width-0">
            <h3 className="h6 fw-semibold mb-1 text-truncate">
              {review.prTitle}
            </h3>

            <p className="small text-secondary mb-0 text-truncate">
              {repoLabel}
            </p>
          </div>

          <div className="flex-shrink-0">
            <ScoreRing
              score={review.overallScore}
              size={48}
            />
          </div>

        </div>

        {/* Summary */}
        <p
          className="small text-secondary mb-4"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {review.summary || 'No summary available.'}
        </p>

        {/* Severity badges */}
        <div className="d-flex flex-wrap gap-2">
          <SeverityBadge
            label="High"
            count={review.issueCounts?.high || 0}
            color="high"
          />

          <SeverityBadge
            label="Med"
            count={review.issueCounts?.medium || 0}
            color="medium"
          />

          <SeverityBadge
            label="Low"
            count={review.issueCounts?.low || 0}
            color="low"
          />
        </div>

      </div>
    </Link>
  );
}