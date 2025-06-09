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


  };
  