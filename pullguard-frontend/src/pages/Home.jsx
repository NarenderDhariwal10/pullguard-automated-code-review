import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGithub, FaShieldAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  
  const colors = {
    primary: '#1e3c72',
    secondary: '#2a5298',
    accent: '#fdb813',
    lightText: 'rgba(240, 244, 248, 0.85)',
  };

  const heroStyle = {
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.primary} 100%)`,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.lightText,
    textAlign: 'center',
    padding: '4rem 1rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    opacity: fadeIn ? 1 : 0,
    transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
  };

  const brandTextStyle = {
    color: colors.accent,
    fontWeight: 700,
  };

  const textLight = {
    color: colors.lightText,
    fontSize: '1.25rem',
    maxWidth: '600px',
    margin: '0 auto 2.5rem',
    lineHeight: 1.6,
  };

  const iconWrapper = {
    marginBottom: '1.5rem',
    opacity: 0.15,
    filter: 'drop-shadow(0 0 8px rgba(253, 184, 19, 0.5))',
    transition: 'opacity 0.3s ease, filter 0.3s ease',
  };

  const getStartedBtn = {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
    color: colors.primary,
    fontWeight: 600,
    fontSize: '1.1rem',
    padding: '0.75rem 2.5rem',
    borderRadius: '40px',
    boxShadow: `0 4px 12px rgba(253, 184, 19, 0.5)`,
    transition: 'all 0.3s ease',
  };

  return (
    <div style={heroStyle}>
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={8}>
            <div
              style={iconWrapper}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.25)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.15)}
            >
              <FaShieldAlt size={100} />
            </div>
            <h1
              style={{
                fontWeight: 900,
                fontSize: '3.5rem',
                marginBottom: '1rem',
              }}
            >
              Welcome to <span style={brandTextStyle}>PullGuard</span>
            </h1>
            <p style={textLight}>
              Automated, AI-powered code reviews for your GitHub repositories.
            </p>
            <Button
              as={Link}
              to="/login"
              style={getStartedBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e6ac00';
                e.currentTarget.style.boxShadow =
                  '0 6px 20px rgba(230, 172, 0, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.accent;
                e.currentTarget.style.boxShadow =
                  '0 4px 12px rgba(253, 184, 19, 0.5)';
              }}
            >
              <FaGithub className="me-2" size={20} /> Get Started with GitHub
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
