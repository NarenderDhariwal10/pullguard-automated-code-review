import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Zap, GitBranch, Lock } from 'lucide-react';
import InfoBox from '../components/InfoBox';

export default function Home() {
  const features = [
    {
      icon: Lock,
      title: 'Security Analysis',
      desc: 'Flags injection risks, unsafe patterns, and common OWASP issues directly in PR diffs.',
    },
    {
      icon: Zap,
      title: 'Async Processing',
      desc: 'Webhooks enqueue jobs on Redis/BullMQ so reviews never block the GitHub callback.',
    },
    {
      icon: GitBranch,
      title: 'GitHub Workflow',
      desc: 'Comments appear on the PR — your team keeps their existing review process in GitHub.',
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="container py-5">
        <div className="text-center py-5">
          <p className="text-primary fw-semibold mb-3">
            🤖 AI Code Review · Portfolio Project
          </p>

          <h1 className="display-4 fw-bold text-dark mb-4">
            Automated PR reviews for teams that{' '}
            <span className="text-primary">
              self-host their tools
            </span>
          </h1>

          <p className="lead text-secondary mx-auto mb-4" style={{ maxWidth: '750px' }}>
            PullGuard connects to GitHub via webhooks and a server-side token,
            runs AI analysis on pull requests, and posts structured feedback.
            Built to demonstrate production engineering — queue workers,
            JWT auth, and clean architecture.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link
              to="/demo"
              className="btn btn-primary btn-lg d-flex align-items-center gap-2"
            >
              Try Demo
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/how-it-works"
              className="btn btn-outline-secondary btn-lg"
            >
              How It Works
            </Link>
          </div>

          <p className="small text-secondary mt-3">
            Demo mode works instantly — no PAT or webhook required
          </p>
        </div>
      </section>

      {/* Info box */}
      <section className="container pb-5">
        <div className="mx-auto" style={{ maxWidth: '750px' }}>
          <InfoBox />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">How It Works</h2>
          <p className="text-secondary">
            Automated code reviews without changing your team's workflow.
          </p>
        </div>

        <div className="row g-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="mb-4">
                    <div
                      className="bg-primary bg-opacity-10 rounded-3 d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: '56px',
                        height: '56px',
                      }}
                    >
                      <Icon size={24} className="text-primary" />
                    </div>
                  </div>

                  <h3 className="h5 fw-semibold text-dark mb-3">
                    {title}
                  </h3>

                  <p className="text-secondary small mb-0">
                    {desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}