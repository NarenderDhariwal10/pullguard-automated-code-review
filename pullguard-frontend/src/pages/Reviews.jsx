import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { FaCodeBranch, FaClock, FaCommentDots, FaExclamationTriangle } from 'react-icons/fa';
import api from '../utils/api';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const repo = searchParams.get('repo');

  useEffect(() => {
    const url = repo ? `/api/reviews?repo=${encodeURIComponent(repo)}` : '/api/reviews';
    api
      .get(url)
      .then((res) => setReviews(res.data))
      .catch((err) => {
        console.error(err);
        setError('Failed to load reviews.');
      })
      .finally(() => setLoading(false));
  }, [repo]);

  const cardStyle = {
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
  };

  const cardHoverStyle = {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="fw-bold mb-4">
        Your Code Reviews{' '}
        {repo ? <small className="text-muted">({repo})</small> : null}
      </h2>

      {error && (
        <Alert variant="danger" className="d-flex align-items-center">
          <FaExclamationTriangle className="me-2" />
          {error}
        </Alert>
      )}

      {!error && reviews.length === 0 && (
        <div className="text-center text-muted py-5">
          <FaCommentDots size={40} className="mb-3" />
          <h5>No reviews found</h5>
          <p>It looks like you haven’t received any AI reviews yet.</p>
        </div>
      )}

      {!error && reviews.length > 0 && (
        <Row xs={1} md={2} lg={3} className="g-4">
          {reviews.map((r) => (
            <Col key={r._id}>
              <Card
                style={cardStyle}
                className="h-100"
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
              >
                <Card.Body>
                  <Card.Title className="fw-bold mb-2">
                    PR #{r.prNumber ?? '—'}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <FaCodeBranch className="me-1" /> {r.repo}
                  </Card.Subtitle>
                  <Card.Text
                    className="mb-3"
                    style={{
                      maxHeight: '3.5rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {r.comment || 'No comment available.'}
                  </Card.Text>
                  <div className="text-muted small mb-3">
                    <FaClock className="me-1" /> {new Date(r.createdAt).toLocaleString()}
                  </div>
                  <Button
                    as={Link}
                    to={`/reviews/${r._id}`}
                    variant="secondary"
                    size="sm"
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
