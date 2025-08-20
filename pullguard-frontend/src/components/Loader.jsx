import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loader({ text = 'Loading...' }) {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: '200px' }}
    >
      <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">{text}</span>
      </Spinner>
      <div className="mt-3 text-secondary fw-medium">{text}</div>
    </div>
  );
}
