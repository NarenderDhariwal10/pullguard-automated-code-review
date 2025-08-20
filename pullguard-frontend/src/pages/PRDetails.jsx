import { useParams } from 'react-router-dom';
import { Container, Card, Spinner, Alert, Badge } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from '../utils/api';
import { FaCodeBranch, FaUser, FaClock } from 'react-icons/fa';

export default function PRDetails() {
  const { id } = useParams();
  const [pr, setPr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`/pullrequests/${id}`)
      .then((res) => setPr(res.data))
      .catch(() => setError('Failed to load pull request details.'))
      .finally(() => setLoading(false));
  }, [id]);

  const cardStyle = {
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '1rem',
    opacity: pr ? 1 : 0,
    transform: pr ? 'translateY(0)' : 'translateY(10px)',
    transition: 'opacity 0.4s ease, transform 0.4s ease',
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card style={cardStyle}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Card.Title className="fw-bold">{pr.title}</Card.Title>
            <Badge bg={pr.status === 'open' ? 'success' : 'secondary'} className="text-uppercase">
              {pr.status}
            </Badge>
          </div>
          <Card.Subtitle className="mb-3 text-muted">
            <FaCodeBranch className="me-1" /> {pr.branch} &nbsp;|&nbsp;
            <FaUser className="me-1" /> {pr.author} &nbsp;|&nbsp;
            <FaClock className="me-1" /> {new Date(pr.createdAt).toLocaleString()}
          </Card.Subtitle>
          <Card.Text style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
            {pr.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
