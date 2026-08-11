import { useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Card, Spinner } from 'react-bootstrap';
import { FaGithub, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { API_URL } from '../utils/config';

export default function Login() {
  const { user, loading, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/auth/logout`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      navigate('/');
    }
  };

  const colors = {
    primary: '#24292e',
    accent: '#28a745',
    light: '#f6f8fa',
  };

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
            <Button style={logoutBtnStyle} onClick={handleLogout}>
              <FaSignOutAlt className="me-2" /> Logout
            </Button>
          </>
        ) : (
          <>
            <h4 className="mb-4">Sign in to PullGuard</h4>
            <Button
              style={loginBtnStyle}
              href={`${API_URL}/auth/github`}
              className="w-100"
            >
              <FaGithub className="me-2" /> Login with GitHub
            </Button>
            <Button
              as={Link}
              to="/demo"
              variant="outline-secondary"
              className="w-100 mt-3"
            >
              Try Demo
            </Button>
          </>
        )}
      </Card>
    </Container>
  );
}
