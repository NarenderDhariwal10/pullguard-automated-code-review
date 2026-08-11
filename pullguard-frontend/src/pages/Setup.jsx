import { Link } from 'react-router-dom';
import { GitBranch, Shield, Settings, Activity } from 'lucide-react';

export default function Setup() {
  return (
    <div className="container py-5">
      <div className="row align-items-center gy-4">
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold">Setup PullGuard</h1>
          <p className="lead text-secondary">
            Get started with GitHub integration, webhook configuration, and a secure review process for your team.
          </p>

          <div className="row g-3 mb-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm p-4">
                <div className="d-flex align-items-center mb-3">
                  <GitBranch className="text-primary me-3" size={24} />
                  <h5 className="mb-0">Connect your repo</h5>
                </div>
                <p className="text-secondary mb-0">
                  Authorize GitHub and register repositories so PullGuard can monitor pull requests and deliver automated review feedback.
                </p>
              </div>
            </div>
            <div className="col-12">
              <div className="card border-0 shadow-sm p-4">
                <div className="d-flex align-items-center mb-3">
                  <Shield className="text-primary me-3" size={24} />
                  <h5 className="mb-0">Configure security checks</h5>
                </div>
                <p className="text-secondary mb-0">
                  Enable scanning for injection, authorization, and quality issues, and customize how PullGuard prioritizes findings.
                </p>
              </div>
            </div>
            <div className="col-12">
              <div className="card border-0 shadow-sm p-4">
                <div className="d-flex align-items-center mb-3">
                  <Activity className="text-primary me-3" size={24} />
                  <h5 className="mb-0">Review actions</h5>
                </div>
                <p className="text-secondary mb-0">
                  Reviews are queued automatically and results are made available in the dashboard. You can also review details for each pull request.
                </p>
              </div>
            </div>
          </div>

          <Link to="/demo" className="btn btn-primary btn-lg me-2">
            Try Demo Now
          </Link>
          <Link to="/login" className="btn btn-outline-secondary btn-lg">
            Sign in with GitHub
          </Link>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-lg p-4">
            <div className="card-body">
              <h2 className="h5 fw-semibold mb-3">Quick Start Checklist</h2>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">• Authenticate with GitHub</li>
                <li className="mb-2">• Install webhook on selected repository</li>
                <li className="mb-2">• Run a sample pull request</li>
                <li className="mb-2">• Review AI feedback and fix issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
