import { Info } from 'lucide-react';

export default function InfoBox() {
  return (
    <div className="alert alert-light border mb-0">
      <div className="d-flex align-items-start gap-3">

        <Info
          size={18}
          className="text-primary flex-shrink-0 mt-1"
        />

        <div className="small text-secondary">

          <p className="fw-semibold text-dark mb-2">
            How live reviews work
          </p>

          <p>
            PullGuard is a{' '}
            <strong>self-hosted review service</strong> for your
            team or company — not a public multi-tenant SaaS.
            To handle real pull requests, an operator configures
            the backend with:
          </p>

          <ul className="mb-3 ps-4">
            <li className="mb-1">
              <strong>GitHub OAuth</strong> — user sign-in (
              <code className="small bg-light border px-1 rounded">
                GITHUB_CLIENT_ID
              </code>{' '}
              +{' '}
              <code className="small bg-light border px-1 rounded">
                GITHUB_CLIENT_SECRET
              </code>
              )
            </li>

            <li className="mb-1">
              <strong>Personal Access Token</strong> — server-side
              API access (
              <code className="small bg-light border px-1 rounded">
                GITHUB_TOKEN
              </code>{' '}
              with repo scope)
            </li>

            <li className="mb-1">
              <strong>Repository webhook</strong> — pointing to
              your deployed API URL
            </li>

            <li>
              <strong>Public URL</strong> — reachable backend
              (Railway, ngrok, etc.)
            </li>
          </ul>

          <p className="mb-0">
            <strong>Demo Mode</strong> lets you explore the
            dashboard with sample reviews — no GitHub setup
            required.
          </p>

        </div>
      </div>
    </div>
  );
}