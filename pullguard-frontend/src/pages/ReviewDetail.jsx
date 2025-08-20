import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Spinner, Alert, Badge } from 'react-bootstrap';
import { FaCodeBranch, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import api from '../utils/api';

export default function ReviewDetail() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/api/reviews/${id}`)
      .then((res) => setReview(res.data))
      .catch((err) => {
        console.error(err);
        setError('Failed to load review details.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const cardStyle = {
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '1rem',
    opacity: review ? 1 : 0,
    transform: review ? 'translateY(0)' : 'translateY(10px)',
    transition: 'opacity 0.4s ease, transform 0.4s ease',
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: '70vh' }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="d-flex align-items-center">
          <FaExclamationTriangle className="me-2" />
          {error}
        </Alert>
      </Container>
    );
  }

  if (!review) {
    return (
      <Container className="mt-5">
        <Alert variant="warning" className="d-flex align-items-center">
          <FaExclamationTriangle className="me-2" />
          No review found.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="fw-bold mb-4">Review Details</h2>
      <Card style={cardStyle}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Card.Title className="fw-bold mb-0">
              PR #{review.prNumber ?? '—'} — {review.repo}
            </Card.Title>
            <Badge bg="info" text="dark">
              Review
            </Badge>
          </div>

          <Card.Subtitle className="mb-3 text-muted">
            <FaCodeBranch className="me-1" /> {review.repo} &nbsp;|&nbsp;
            <FaClock className="me-1" />{' '}
            {new Date(review.createdAt).toLocaleString()}
          </Card.Subtitle>

          <Card.Text>
            <strong>AI Comment:</strong>
            <pre
              style={{
                background: '#f8f9fa',
                padding: '1rem',
                borderRadius: '6px',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                marginTop: '0.5rem',
                border: '1px solid #e9ecef',
              }}
            >
              {review.comment || 'No comment available.'}
            </pre>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
