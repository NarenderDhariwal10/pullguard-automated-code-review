import { useEffect, useState } from 'react';
import { useDemoMode } from '../hooks/useDemoMode';
import { demoApi, liveApi } from '../utils/api';
import RepoCard from '../components/RepoCard';
import DemoBanner from '../components/DemoBanner';
import InfoBox from '../components/InfoBox';

export default function Repos() {
  const { isDemo } = useDemoMode();

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const prefix = isDemo ? '/demo' : '';

  useEffect(() => {
    const api = isDemo ? demoApi : liveApi;

    setLoading(true);
    setError(null);

    api
      .getRepos()
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        console.error(err);
        setError(
          err?.response?.data?.error || 'Failed to load repositories'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isDemo]);

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
            Loading repositories...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="mb-4">
        <h1 className="fw-bold mb-1">
          Connected Repositories
        </h1>

        <p className="text-secondary mb-0">
          Repositories with PullGuard installed
        </p>
      </div>

      {/* Demo information */}
      {isDemo && (
        <div className="mb-4">
          <div className="alert alert-primary mb-3">
            <div className="small">
              <strong>Demo mode:</strong>{' '}
              These are sample repositories. In production, your
              team connects real repositories via webhook + server
              PAT. See the Settings or Setup Guide for details.
            </div>
          </div>

          <DemoBanner />
        </div>
      )}

      {/* Error */}
      {!isDemo && error && (
        <div className="mb-4">
          <InfoBox />
        </div>
      )}

      {/* Repository list */}
      {repos.length > 0 ? (
        <div className="row g-4">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="col-12 col-md-6 col-lg-4"
            >
              <RepoCard
                repo={repo}
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
                📁
              </span>
            </div>

            <h2 className="h5 fw-semibold mb-2">
              No repositories found
            </h2>

            {!isDemo ? (
              <p className="text-secondary small mb-0">
                Sign in with GitHub and configure a webhook on
                your repository. See the Setup Guide for details.
              </p>
            ) : (
              <p className="text-secondary small mb-0">
                No sample repositories are currently available.
              </p>
            )}

          </div>
        </div>
      )}

    </div>
  );
}