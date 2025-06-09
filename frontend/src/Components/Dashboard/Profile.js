import React, { useState } from 'react';
import { Card, Form, Button, Alert, Badge, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { usersAPI } from '../../services/api';

const Profile = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState(user?.sriPreferences || []);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const sriOptions = [
    'Green Tech',
    'Women-led Companies', 
    'Sustainable Energy',
    'Clean Water',
    'Social Impact',
    'ESG Focused'
  ];

  const handlePreferenceChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    if (isChecked) {
      setPreferences([...preferences, value]);
    } else {
      setPreferences(preferences.filter(pref => pref !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await usersAPI.updatePreferences(preferences);
      setMessage('Preferences updated successfully!');
      setMessageType('success');
    } catch (error) {
      setMessage('Failed to update preferences');
      setMessageType('danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>⚙️ Profile Settings</h2>
      <p className="text-muted mb-4">
        Manage your SRI preferences to get personalized investment suggestions
      </p>

      <Row>
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="mb-4">Personal Information</h5>
              
              <div className="mb-4">
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Username:</strong>
                      <p className="mb-0 text-muted">{user?.username}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Email:</strong>
                      <p className="mb-0 text-muted">{user?.email}</p>
                    </div>
                  </Col>
                </Row>
              </div>

              <hr />

              <Form onSubmit={handleSubmit}>
                <h5 className="mb-3">SRI Investment Preferences</h5>
                
                {message && (
                  <Alert variant={messageType} className="mb-3">
                    {message}
                  </Alert>
                )}

                <div className="mb-4">
                  <p className="text-muted mb-3">
                    Select the areas of socially responsible investing that interest you most:
                  </p>
                  
                  {sriOptions.map((option) => (
                    <Form.Check
                      key={option}
                      type="checkbox"
                      id={`pref-${option}`}
                      value={option}
                      label={option}
                      checked={preferences.includes(option)}
                      onChange={handlePreferenceChange}
                      className="mb-2"
                    />
                  ))}
                </div>

                <Button
                  type="submit"
                  variant="success"
                  disabled={loading || preferences.length === 0}
                >
                  {loading ? 'Updating...' : 'Update Preferences'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="mb-3">Current Preferences</h6>
              {preferences.length > 0 ? (
                <div>
                  {preferences.map((pref) => (
                    <Badge key={pref} bg="success" className="me-1 mb-1">
                      {pref}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted small">No preferences selected</p>
              )}
              
              <hr />
              
              <h6 className="mb-3">Account Stats</h6>
              <div className="small text-muted">
                <div className="d-flex justify-content-between mb-2">
                  <span>Following:</span>
                  <strong>0 investors</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Member since:</span>
                  <strong>Today</strong>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;