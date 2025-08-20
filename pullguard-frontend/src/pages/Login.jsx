import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Button, Card, Spinner } from 'react-bootstrap';
import { FaGithub, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const colors = {
    primary: '#24292e', // GitHub dark
    accent: '#28a745',  // GitHub green
    light: '#f6f8fa',
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/me', { withCredentials: true })
      .then(res => {
        if (res.data) {
          setUser(res.data);
          // Redirect if logged in
          navigate('/dashboard');
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [navigate]);

  const cardStyle = {
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '10vh',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    backgroundColor: colors.light,
    textAlign: 'center',
    opacity: loading ? 0 : 1,
    transform: loading ? 'translateY(10px)' : 'translateY(0)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  };

  const loginBtnStyle = {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    fontWeight: 600,
    padding: '0.65rem 1.5rem',
    fontSize: '1rem',
  };

  const logoutBtnStyle = {
    backgroundColor: '#d73a49',
    borderColor: '#d73a49',
    fontWeight: 600,
    padding: '0.65rem 1.5rem',
    fontSize: '1rem',
  };

  return (
    <Container>
      <Card style={cardStyle}>
        {loading ? (
          <Spinner animation="border" variant="secondary" />
        ) : user ? (
          <>
            <FaUserCircle size={60} color={colors.primary} className="mb-3" />
            <h3 className="mb-3">Welcome, {user.username}</h3>
            <Button
              style={logoutBtnStyle}
              onClick={() => {
                axios
                  .get('http://localhost:3000/auth/logout', { withCredentials: true })
                  .then(() => {
                    setUser(null);
                    navigate('/');
                  });
              }}
            >
              <FaSignOutAlt className="me-2" /> Logout
            </Button>
          </>
        ) : (
          <>
            <h4 className="mb-4">Sign in to PullGuard</h4>
            <Button
              style={loginBtnStyle}
              href="http://localhost:3000/auth/github"
            >
              <FaGithub className="me-2" /> Login with GitHub
            </Button>
          </>
        )}
      </Card>
    </Container>
  );
}
