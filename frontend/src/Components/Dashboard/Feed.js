import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Row, Col, Badge, Button, Alert, Spinner } from 'react-bootstrap';
import { usersAPI } from '../../services/api';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.getFeed();
      setPosts(response.data.posts);
    } catch (err) {
      setError('Failed to load feed. Make sure you are following some investors!');
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading your feed...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📰 Your SRI Feed</h2>
        <Button variant="outline-success" onClick={fetchFeed}>
          Refresh
        </Button>
      </div>

      {error && <Alert variant="warning">{error}</Alert>}

      {posts.length === 0 && !error && (
        <Alert variant="info">
          <h5>No posts in your feed !</h5>
          <p>Start following some investors to see their latest SRI insights and investments.</p>
          <Button variant="success" href="/dashboard/investors">
            Find Investors to Follow
          </Button>
        </Alert>
      )}

      <Row>
        {posts.map((post) => (
          <Col lg={6} className="mb-4" key={post.id}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ fontSize: '2rem' }}>
                    {post.investor.avatar}
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center">
                      <strong className="me-2">{post.investor.name}</strong>
                      {post.investor.isVerified && (
                        <Badge bg="primary" className="me-2">✓</Badge>
                      )}
                    </div>
                    <small className="text-muted">
                      @{post.investor.username} • {formatTimeAgo(post.timestamp)}
                    </small>
                  </div>
                </div>
                
                <Card.Text className="mb-3">
                  {post.content}
                </Card.Text>
                
                {post.stock && (
                  <Badge bg="success" className="mb-3">
                    ${post.stock}
                  </Badge>
                )}
                
                <div className="d-flex justify-content-between align-items-center text-muted">
                  <span>❤️ {post.likes} likes</span>
                  <Button variant="outline-success" size="sm">
                    Learn More
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Feed;