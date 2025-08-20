import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCodeBranch, FaEye, FaGithub } from 'react-icons/fa';
import api from '../utils/api';

export default function Repos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/repos')
      .then(res => setRepos(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const cardStyle = {
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  const cardHoverStyle = {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading repositories...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4 fw-bold text-primary">📂 Your Connected Repositories</h2>

      {repos.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <FaGithub size={50} className="mb-3" />
          <h5>No connected repositories</h5>
          <p>It looks like you haven’t connected any repositories yet.</p>
          <Button variant="success" as={Link} to="/connect">
            Connect a Repository
          </Button>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {repos.map(repo => (
            <Col key={repo.id}>
              <Card
                className="shadow-sm border-0 h-100"
                style={cardStyle}
                onMouseEnter={e => Object.assign(e.currentTarget.style, cardHoverStyle)}
                onMouseLeave={e => Object.assign(e.currentTarget.style, cardStyle)}
              >
                <Card.Body>
                  <Card.Title className="fw-bold">{repo.name}</Card.Title>
                  <Card.Subtitle className="mb-3 text-muted">
                    <FaCodeBranch className="me-2" /> {repo.defaultBranch}
                  </Card.Subtitle>
                  <div className="d-flex gap-2">
                    <Button
                      as={Link}
                      to={`/reviews?repo=${encodeURIComponent(repo.name)}`}
                      variant="primary"
                      size="sm"
                    >
                      <FaEye className="me-1" /> View Reviews
                    </Button>
                    <Button
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline-dark"
                      size="sm"
                    >
                      <FaGithub className="me-1" /> GitHub
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
