import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';

// pages 
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Repos from './pages/Repos';
import Reviews from './pages/Reviews';
import ReviewDetail from './pages/ReviewDetail';
import Settings from './pages/Settings';
import Login from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-vh-100 d-flex flex-column">
          <Navbar />
          <main className="container my-4 flex-grow-1">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route exact path="/repos" element={<ProtectedRoute><Repos /></ProtectedRoute>} />
              <Route exact path="/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
              <Route exact path="/reviews/:id" element={<ProtectedRoute><ReviewDetail /></ProtectedRoute>} />
              <Route exact path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </main>
          <footer className="bg-light text-center py-3 mt-auto">&copy; {new Date().getFullYear()} PullGuard</footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
