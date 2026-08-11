import { Link } from 'react-router-dom';
import { Zap, GitBranch, Shield, MessageCircle } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">How PullGuard Works</h1>
        <p className="lead text-secondary mx-auto" style={{ maxWidth: '720px' }}>
          PullGuard connects GitHub pull requests to automated, AI-powered code reviews and delivers feedback where your team already works.
        </p>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100 p-4">
            <div className="d-flex align-items-center justify-content-center mb-3 rounded-circle bg-primary bg-opacity-10" style={{ width: '56px', height: '56px' }}>
              <GitBranch size={24} className="text-primary" />
            </div>
            <h3 className="h5 fw-semibold">Connect Repositories</h3>
            <p className="text-secondary mb-0">
              Install PullGuard on your repo, configure a GitHub webhook, and authorize via GitHub OAuth so PR events flow into your review pipeline.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100 p-4">
            <div className="d-flex align-items-center justify-content-center mb-3 rounded-circle bg-primary bg-opacity-10" style={{ width: '56px', height: '56px' }}>
              <Zap size={24} className="text-primary" />
            </div>
            <h3 className="h5 fw-semibold">Analyze Pull Requests</h3>
            <p className="text-secondary mb-0">
              PullGuard inspects changed files, scores risk, and highlights security, logic and quality issues directly inside your PR review.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100 p-4">
            <div className="d-flex align-items-center justify-content-center mb-3 rounded-circle bg-primary bg-opacity-10" style={{ width: '56px', height: '56px' }}>
              <Shield size={24} className="text-primary" />
            </div>
            <h3 className="h5 fw-semibold">Improve Security</h3>
            <p className="text-secondary mb-0">
              Gain automated OWASP-style checks, vulnerability spotting, and remediation suggestions before code merges into your main branch.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100 p-4">
            <div className="d-flex align-items-center justify-content-center mb-3 rounded-circle bg-primary bg-opacity-10" style={{ width: '56px', height: '56px' }}>
              <MessageCircle size={24} className="text-primary" />
            </div>
            <h3 className="h5 fw-semibold">Feedback in GitHub</h3>
            <p className="text-secondary mb-0">
              PullGuard posts structured review comments back to GitHub, so your team sees findings where they already complete code reviews.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link to="/setup" className="btn btn-primary btn-lg me-3">
          Setup Guide
        </Link>
        <Link to="/demo" className="btn btn-outline-secondary btn-lg">
          Try Demo
        </Link>
      </div>
    </div>
  );
}
