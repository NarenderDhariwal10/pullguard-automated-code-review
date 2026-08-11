import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useDemoMode, demoUser } from '../hooks/useDemoMode';
import { API_URL } from '../utils/config';

export default function Navbar() {
  const { user, setUser } = useAuth();
  const { isDemo } = useDemoMode();
  const location = useLocation();
  const navigate = useNavigate();

  const prefix = isDemo ? '/demo' : '';
  const displayUser = isDemo ? demoUser : user;

  const handleLogout = async () => {
    if (isDemo) {
      navigate('/');
      return;
    }

    try {
      await fetch(`${API_URL}/auth/logout`, {
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout failed', error);
    }

    setUser(null);
    navigate('/');
  };

  const navLinks = [
    { to: `${prefix}/dashboard`, label: 'Dashboard' },
    { to: `${prefix}/reviews`, label: 'Reviews' },
    { to: `${prefix}/repos`, label: 'Repositories' },
  ];

  const isActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(path + '/');

  const isLanding = location.pathname === '/';

  /*
   * Landing page navbar
   */
  if (isLanding) {
    return (
      <nav className="navbar navbar-expand-md bg-white border-bottom">
        <div className="container py-2">
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center gap-2 fw-bold"
          >
            <Shield size={24} className="text-primary" />
            PullGuard
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#landingNavbar"
            aria-controls="landingNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="landingNavbar"
          >
            <div className="navbar-nav ms-auto align-items-md-center">
              <Link to="/how-it-works" className="nav-link">
                How It Works
              </Link>

              <Link to="/setup" className="nav-link">
                Setup Guide
              </Link>

              <Link to="/login" className="nav-link">
                Log in
              </Link>

              <Link
                to="/demo"
                className="btn btn-primary ms-md-2 mt-2 mt-md-0"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  /*
   * Dashboard / application navbar
   */
  return (
    <nav className="navbar navbar-expand-md bg-white border-bottom">
      <div className="container">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2 fw-bold"
        >
          <Shield size={24} className="text-primary" />

          PullGuard

          {isDemo && (
            <span className="badge bg-light text-secondary border">
              Demo
            </span>
          )}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="mainNavbar"
        >
          <div className="navbar-nav ms-auto me-md-4">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link ${
                  isActive(to) ? 'active fw-semibold' : ''
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="d-flex align-items-center gap-2">
            {displayUser ? (
              <>
                <div className="d-flex align-items-center gap-2">
                  {displayUser.avatarUrl ? (
                    <img
                      src={displayUser.avatarUrl}
                      alt=""
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                      style={{
                        width: '32px',
                        height: '32px',
                      }}
                    >
                      {displayUser.username?.[0]?.toUpperCase() || 'D'}
                    </div>
                  )}

                  <span className="small text-secondary d-none d-sm-block">
                    {displayUser.username}
                  </span>

                  <ChevronDown
                    size={14}
                    className="text-secondary"
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleLogout}
                >
                  {isDemo ? 'Exit Demo' : 'Logout'}
                </button>
              </>
            ) : (
              <a
                href={`${API_URL}/auth/github`}
                className="btn btn-primary btn-sm"
              >
                Sign in with GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}