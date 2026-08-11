import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { AuthProvider } from './hooks/useAuth';
import { DemoProvider } from './hooks/useDemoMode';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Setup from './pages/Setup';
import Dashboard from './pages/Dashboard';
import Repos from './pages/Repos';
import Reviews from './pages/Reviews';
import ReviewDetail from './pages/ReviewDetail';
import Settings from './pages/Settings';
import Login from './pages/Login';

function AppRoutes() {
  const location = useLocation();
  const isDemo = location.pathname.startsWith('/demo');

  return (
    <DemoProvider isDemo={isDemo}>
      <div className="min-vh-100 d-flex flex-column">

        <Navbar />

        <main className="container my-4 flex-grow-1">
          <Routes>

            {/* Landing pages */}
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/setup" element={<Setup />} />

            {/* Authenticated Pages */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/repos"
              element={
                <ProtectedRoute>
                  <Repos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reviews"
              element={
                <ProtectedRoute>
                  <Reviews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reviews/:id"
              element={
                <ProtectedRoute>
                  <ReviewDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Demo application */}
            <Route path="/demo" element={<Navigate to="/demo/dashboard" replace />} />
            <Route path="/demo/dashboard" element={<Dashboard />} />
            <Route path="/demo/repos" element={<Repos />} />
            <Route path="/demo/reviews" element={<Reviews />} />
            <Route path="/demo/reviews/:id" element={<ReviewDetail />} />

            {/* Fallback Page */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </main>

        <footer className="bg-light text-center py-3 mt-auto">
          &copy; {new Date().getFullYear()} PullGuard
        </footer>

      </div>
    </DemoProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

