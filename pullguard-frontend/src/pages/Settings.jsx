import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { FaSave, FaCog } from 'react-icons/fa';
import axios from '../utils/api';

export default function Settings() {
  const [preferences, setPreferences] = useState({
    notifyEmail: true,
    autoReview: false,
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: checked }));
  };

  const saveSettings = async () => {
    setSaving(true);
    setSuccess('');
    setError('');
    try {
      await axios.post('/settings', preferences);
      setSuccess('Your settings have been saved successfully.');
    } catch (err) {
      console.error(err);
      setError('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <Card className="shadow-sm border-0">
        <Card.Body>
          <div className="d-flex align-items-center mb-3">
            <FaCog size={28} className="text-primary me-2" />
            <h3 className="mb-0 fw-bold">Settings</h3>
          </div>

          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form>
            <Form.Check
              type="switch"
              id="notifyEmail"
              name="notifyEmail"
              label="Email me when a review is complete"
              checked={preferences.notifyEmail}
              onChange={handleChange}
              className="mb-3"
            />
            <Form.Check
              type="switch"
              id="autoReview"
              name="autoReview"
              label="Automatically review new pull requests"
              checked={preferences.autoReview}
              onChange={handleChange}
              className="mb-4"
            />

            <Button
              variant="primary"
              onClick={saveSettings}
              disabled={saving}
              className="d-flex align-items-center"
            >
              {saving ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="me-2" /> Save Settings
                </>
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
