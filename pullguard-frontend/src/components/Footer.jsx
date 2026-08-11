import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-top mt-auto">
      <div className="container py-5">

        <div className="row g-4">

          {/* Brand */}
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center gap-2 fw-bold text-dark mb-3">
              <Shield size={20} className="text-primary" />
              PullGuard
            </div>

            <p
              className="small text-secondary mb-0"
              style={{ maxWidth: '400px' }}
            >
              Self-hosted AI code review for GitHub pull requests.
              Built as a portfolio-grade engineering project with
              demo mode for instant exploration.
            </p>
          </div>

          {/* Links */}
          <div className="col-12 col-md-6">
            <h4 className="h6 fw-semibold text-dark mb-3">
              Links
            </h4>

            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a
                  href="/#features"
                  className="small text-secondary text-decoration-none"
                >
                  Features
                </a>
              </li>

              <li className="mb-2">
                <Link
                  to="/how-it-works"
                  className="small text-secondary text-decoration-none"
                >
                  How It Works
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/settings"
                  className="small text-secondary text-decoration-none"
                >
                  Setup Guide
                </Link>
              </li>

              <li>
                <a
                  href="https://github.com/NarenderDhariwal10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="small text-secondary text-decoration-none"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-top mt-4 pt-4 text-center">
          <p className="small text-secondary mb-0">
            © {new Date().getFullYear()} PullGuard · Built by
            Narender Dhariwal
          </p>
        </div>

      </div>
    </footer>
  );
}