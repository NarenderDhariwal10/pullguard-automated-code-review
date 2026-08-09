import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { FaSearch, FaCodeBranch, FaClock, FaExclamationCircle } from 'react-icons/fa';

export default function Dashboard() {
  const [reviews, setReviews] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data } = await axios.get('http://localhost:3008/api/reviews');
        setReviews(data);
        setFiltered(data);
      } catch (err) {
        setError('Failed to load reviews');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  // Filter reviews on search
  useEffect(() => {
    const term = search.toLowerCase();
    setFiltered(
      reviews.filter(
        (r) =>
          r.repo.toLowerCase().includes(term) ||
          r.comment.toLowerCase().includes(term) ||
          String(r.prNumber).includes(term)
      )
    );
  }, [search, reviews]);

  const cardStyle = {
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
  };
  const cardHoverStyle = {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
  };

  return (
    <Container className="mt-5">
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="fw-bold text-primary">📋 Pull Request Reviews</h2>
        </Col>
        <Col md="4">
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search by repo, PR number, or comment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="primary" className="ms-2">
              <FaSearch />
            </Button>
          </Form>
        </Col>
      </Row>

      {loading && (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && (
        <Alert variant="danger" className="d-flex align-items-center">
          <FaExclamationCircle className="me-2" />
          {error}
        </Alert>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center text-muted py-5">
          <FaExclamationCircle size={40} className="mb-3" />
          <h5>No reviews found</h5>
          <p>Try adjusting your search or connect a repository with reviews.</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filtered.map((review, idx) => (
            <Col key={idx}>
              <Card
                className="shadow-sm border-0 h-100"
                style={cardStyle}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
              >
                <Card.Body>
                  <Card.Title className="fw-bold">
                    PR #{review.prNumber}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <FaCodeBranch className="me-1" />
                    {review.repo}
                  </Card.Subtitle>
                  <Card.Text className="mb-3">{review.comment}</Card.Text>
                  <div className="text-muted small">
                    <FaClock className="me-1" />
                    {new Date(review.createdAt).toLocaleString()}
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
