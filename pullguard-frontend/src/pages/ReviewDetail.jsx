import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { useDemoMode } from '../hooks/useDemoMode';
import { demoApi, liveApi } from '../utils/api';
import ScoreRing from '../components/ScoreRing';

const severityStyles = {
  HIGH: 'danger',
  MEDIUM: 'warning',
  LOW: 'primary',
};

const recLabels = {
  approve: {
    text: 'Approve',
    color: 'success',
  },
  approve_with_suggestions: {
    text: 'Approve with Suggestions',
    color: 'warning',
  },
  needs_changes: {
    text: 'Needs Changes',
    color: 'danger',
  },
};

export default function ReviewDetail() {
  const { id } = useParams();
  const { isDemo } = useDemoMode();

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const prefix = isDemo ? '/demo' : '';

  useEffect(() => {
    const api = isDemo ? demoApi : liveApi;

    setLoading(true);
    setError(null);

    api
      .getReview(id)
      .then((data) => {
        setReview(data);
      })
      .catch((err) => {
        console.error(err);
        setError(
          err?.response?.data?.error ||
            'Failed to load review'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, isDemo]);

  // Loading
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '60vh' }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <p className="text-secondary mb-0">
            Loading review...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <h2 className="h5 mb-2">
            Unable to load review
          </h2>

          <p className="mb-3">
            {error}
          </p>

          <Link
            to={`${prefix}/reviews`}
            className="btn btn-outline-danger"
          >
            <ArrowLeft size={16} className="me-1" />
            Back to Reviews
          </Link>
        </div>
      </div>
    );
  }

  // Review doesn't exist
  if (!review) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2 className="fw-bold mb-3">
            Review not found
          </h2>

          <p className="text-secondary mb-4">
            The review you're looking for doesn't exist.
          </p>

          <Link
            to={`${prefix}/reviews`}
            className="btn btn-primary"
          >
            <ArrowLeft size={16} className="me-1" />
            Back to Reviews
          </Link>
        </div>
      </div>
    );
  }

  const rec =
    recLabels[review.recommendation] ||
    recLabels.approve;

  return (
    <div className="container py-4">

      {/* Back button */}
      <div className="mb-4">
        <Link
          to={`${prefix}/reviews`}
          className="btn btn-link text-secondary text-decoration-none p-0 d-inline-flex align-items-center"
        >
          <ArrowLeft size={16} className="me-2" />
          Back to reviews
        </Link>
      </div>

      {/* Main review card */}
      <div className="card shadow-sm mb-4">
        <div className="card-body p-4">

          {/* Header */}
          <div className="row align-items-start g-3 mb-4">

            <div className="col">
              <h1 className="h4 fw-bold mb-2">
                {review.prTitle}
              </h1>

              <p className="text-secondary small mb-0">
                {review.fullName ||
                  `${review.owner}/${review.repo}`}
                {' · '}
                PR #{review.prNumber}
              </p>
            </div>

            <div className="col-auto">
              <ScoreRing
                score={review.overallScore}
                size={64}
              />
            </div>

          </div>

          {/* Recommendation */}
          <div className="d-flex flex-wrap align-items-center gap-2 mb-4">

            <span
              className={`badge text-bg-${rec.color} px-3 py-2`}
            >
              {rec.text}
            </span>

            {review.prUrl && (
              <a
                href={review.prUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-primary d-inline-flex align-items-center"
              >
                View on GitHub
                <ExternalLink
                  size={14}
                  className="ms-1"
                />
              </a>
            )}

          </div>

          {/* Summary */}
          <div className="bg-light rounded p-3">
            <h2 className="h6 fw-semibold mb-2">
              Review Summary
            </h2>

            <p className="text-secondary mb-0">
              {review.summary || 'No summary available.'}
            </p>
          </div>

        </div>
      </div>

      {/* Category Scores */}
      {review.categoryScores &&
        Object.keys(review.categoryScores).length > 0 && (
          <div className="mb-4">

            <h2 className="h5 fw-semibold mb-3">
              Category Scores
            </h2>

            <div className="row g-3">
              {Object.entries(review.categoryScores).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="col-6 col-md-3"
                  >
                    <div className="card shadow-sm h-100">
                      <div className="card-body text-center">

                        <p className="text-secondary small text-capitalize mb-2">
                          {key.replace(
                            /([A-Z])/g,
                            ' $1'
                          )}
                        </p>

                        <div className="fs-3 fw-bold">
                          {value}
                        </div>

                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

          </div>
        )}

      {/* Issues */}
      {review.issues?.length > 0 ? (
        <section>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h5 fw-semibold mb-0">
              Issues
            </h2>

            <span className="badge text-bg-secondary">
              {review.issues.length}
            </span>
          </div>

          <div className="d-flex flex-column gap-3">

            {review.issues.map((issue, index) => {
              const severity =
                severityStyles[issue.severity] ||
                'secondary';

              return (
                <div
                  key={issue._id || index}
                  className={`alert alert-${severity} mb-0`}
                >

                  {/* Issue header */}
                  <div className="d-flex flex-wrap align-items-center gap-2 mb-2">

                    <span className="badge text-bg-dark">
                      {issue.severity}
                    </span>

                    {issue.category && (
                      <span className="small">
                        {issue.category}
                      </span>
                    )}

                  </div>

                  {/* Title */}
                  <h3 className="h6 fw-bold mb-2">
                    {issue.title}
                  </h3>

                  {/* Description */}
                  <p className="small mb-3">
                    {issue.description}
                  </p>

                  {/* Suggested fix */}
                  {issue.suggestedFix && (
                    <div className="bg-white bg-opacity-50 rounded p-3">
                      <strong className="small">
                        Suggested Fix
                      </strong>

                      <p className="small mb-0 mt-1">
                        {issue.suggestedFix}
                      </p>
                    </div>
                  )}

                </div>
              );
            })}

          </div>
        </section>
      ) : (
        <div className="alert alert-success">
          <h2 className="h6 fw-bold">
            No issues found
          </h2>

          <p className="small mb-0">
            This review did not identify any security or
            code-quality issues.
          </p>
        </div>
      )}

    </div>
  );
}