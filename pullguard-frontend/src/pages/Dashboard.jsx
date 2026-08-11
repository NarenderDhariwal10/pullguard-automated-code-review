import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  TrendingUp,
  AlertTriangle,
  GitBranch,
} from 'lucide-react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { useDemoMode } from '../hooks/useDemoMode';
import { demoApi, liveApi } from '../utils/api';
import StatCard from '../components/StatCard';
import ScoreRing from '../components/ScoreRing';
import DemoBanner from '../components/DemoBanner';

export default function Dashboard() {
  const { isDemo } = useDemoMode();

  const [metrics, setMetrics] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const prefix = isDemo ? '/demo' : '';

  useEffect(() => {
    const api = isDemo ? demoApi : liveApi;

    Promise.all([
      api.getMetrics(),
      api.getReviews(),
    ])
      .then(([m, r]) => {
        setMetrics(m);
        setReviews(r.slice(0, 3));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isDemo]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '60vh' }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  const chartData = metrics?.severityBreakdown
    ? [
        {
          name: 'High',
          count: metrics.severityBreakdown.high,
        },
        {
          name: 'Medium',
          count: metrics.severityBreakdown.medium,
        },
        {
          name: 'Low',
          count: metrics.severityBreakdown.low,
        },
      ]
    : [];

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="mb-4">
        <h1 className="fw-bold mb-1">
          Dashboard
        </h1>

        <p className="text-secondary mb-0">
          {isDemo
            ? 'Exploring PullGuard with sample data.'
            : 'Your live review activity.'}
        </p>
      </div>

      {/* Demo Banner */}
      {isDemo && (
        <div className="mb-4">
          <DemoBanner />
        </div>
      )}

      {/* Statistics */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            icon={FileText}
            label="Total Reviews"
            value={metrics?.totalReviews ?? 0}
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            icon={TrendingUp}
            label="Avg Score"
            value={metrics?.avgScore ?? 0}
            color="blue"
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            icon={AlertTriangle}
            label="High Issues"
            value={metrics?.highIssues ?? 0}
          />
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            icon={GitBranch}
            label="Repositories"
            value={metrics?.repositories ?? 0}
            color="blue"
          />
        </div>
      </div>

      {/* Charts + Recent Reviews */}
      <div className="row g-4">

        {/* Severity Chart */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h2 className="h5 fw-semibold mb-4">
                Issues by Severity
              </h2>

              <ResponsiveContainer
                width="100%"
                height={220}
              >
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                  />

                  <YAxis
                    tick={{ fontSize: 12 }}
                    allowDecimals={false}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="count"
                    fill="#7c3aed"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h5 fw-semibold mb-0">
                  Recent Reviews
                </h2>

                <Link
                  to={`${prefix}/reviews`}
                  className="text-primary text-decoration-none small fw-semibold"
                >
                  View all
                </Link>
              </div>

              <div>
                {reviews.map((r) => (
                  <Link
                    key={r._id}
                    to={`${prefix}/reviews/${r._id}`}
                    className="d-flex align-items-center justify-content-between py-3 border-bottom text-decoration-none"
                  >
                    <div
                      className="me-3"
                      style={{ minWidth: 0 }}
                    >
                      <p className="small fw-semibold text-dark mb-1 text-truncate">
                        {r.prTitle}
                      </p>

                      <p className="small text-secondary mb-0">
                        {r.repo}
                      </p>
                    </div>

                    <div className="flex-shrink-0">
                      <ScoreRing
                        score={r.overallScore}
                        size={44}
                      />
                    </div>
                  </Link>
                ))}

                {reviews.length === 0 && (
                  <p className="small text-secondary text-center py-5 mb-0">
                    No reviews yet. Connect a webhook to start.
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}