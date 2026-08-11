import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDemoMode } from '../hooks/useDemoMode';
import { demoApi, liveApi } from '../utils/api';
import ReviewCard from '../components/ReviewCard';
import DemoBanner from '../components/DemoBanner';

export default function Reviews() {
  const { isDemo } = useDemoMode();
  const [searchParams] = useSearchParams();

  const repoFilter = searchParams.get('repo');

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const prefix = isDemo ? '/demo' : '';
  
  useEffect(() => {
    const api = isDemo ? demoApi : liveApi;
    

    setLoading(true);
    setError(null);

    api
      .getReviews(repoFilter || undefined)
      .then((data) => {
        const filtered =
          repoFilter && isDemo
            ? data.filter((review) => review.repo === repoFilter)
            : data;

        setReviews(filtered);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load reviews.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isDemo, repoFilter]);

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
            Loading reviews...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">

      {/* Page header */}
      <div className="mb-4">
        <h1 className="fw-bold mb-1">
          Review History
        </h1>

        <p className="text-secondary mb-0">
          {repoFilter
            ? `Reviews for ${repoFilter}`
            : 'All pull request reviews'}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-danger mb-4">
          {error}
        </div>
      )}

      {/* Demo banner */}
      {isDemo && (
        <div className="mb-4">
          <DemoBanner />
        </div>
      )}

      {/* Reviews */}
      {reviews.length > 0 ? (
        <div className="row g-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="col-12 col-md-6 col-lg-4"
            >
              <ReviewCard
                review={review}
                basePath={`${prefix}/reviews`}
              />
            </div>
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">

            <div
              className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: '64px',
                height: '64px',
              }}
            >
              <span className="fs-3">
                📄
              </span>
            </div>

            <h2 className="h5 fw-semibold mb-2">
              No reviews yet
            </h2>

            <p className="text-secondary mb-0">
              {repoFilter
                ? `No reviews found for ${repoFilter}.`
                : 'Open a PR on a connected repo to trigger a review.'}
            </p>

          </div>
        </div>
      )}

    </div>
  );
}