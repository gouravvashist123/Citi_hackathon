import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge, Button, Alert, Spinner } from 'react-bootstrap';
import { suggestionsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const response = await suggestionsAPI.getAISuggestions(user?.sriPreferences);
      setSuggestions(response.data.suggestions);
    } catch (err) {
      setError('Failed to load AI suggestions');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">AI is analyzing your preferences...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>🎯 AI Investment Suggestions</h2>
          <p className="text-muted mb-0">
            Personalized recommendations based on your SRI preferences
          </p>
        </div>
        <Button variant="outline-success" onClick={fetchSuggestions}>
          Refresh
        </Button>
      </div>

      {user?.sriPreferences && (
        <Alert variant="info" className="mb-4">
          <strong>Your SRI Focus:</strong>{' '}
          {user.sriPreferences.map((pref, index) => (
            <Badge key={pref} bg="secondary" className="me-1">
              {pref}
            </Badge>
          ))}
        </Alert>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {suggestions.length === 0 && !error && (
        <Alert variant="warning">
          No suggestions available. Please update your SRI preferences in your profile.
        </Alert>
      )}

      <Row>
        {suggestions.map((suggestion, index) => (
          <Col lg={4} md={6} className="mb-4" key={index}>
            <Card className="h-100 shadow-sm border-0 suggestion-card">
              <Card.Body className="d-flex flex-column">
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="mb-0">{suggestion.symbol}</h5>
                    <Badge bg="success">AI Pick</Badge>
                  </div>
                  <h6 className="text-muted">{suggestion.name}</h6>
                </div>
                
                <div className="mb-3 flex-grow-1">
                  <p className="mb-2">
                    <strong>Why:</strong> {suggestion.reason}
                  </p>
                  <p className="mb-0 text-success">
                    <strong>Impact:</strong> {suggestion.impact}
                  </p>
                </div>
                
                <div className="d-grid gap-2">
                  <Button variant="success" size="sm">
                    Research {suggestion.symbol}
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    Add to Watchlist
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-5 p-4 bg-light rounded">
        <h5>💡 How Our AI Works</h5>
        <p className="mb-0">
          Our AI analyzes your SRI preferences and matches them with companies that align 
          with your values. We consider ESG ratings, impact metrics, and sustainability 
          initiatives to provide personalized investment suggestions.
        </p>
      </div>
    </div>
  );
};

export default Suggestions;