import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import Feed from './Feed';
import Suggestions from './Suggestions';
import Profile from './Profile';
import InvestorList from '../Investors/InvestorList';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getActiveKey = () => {
    const path = location.pathname.split('/dashboard/')[1] || 'feed';
    return path;
  };

  const handleSelect = (key) => {
    navigate(`/dashboard/${key}`);
  };

  return (
    <div>
      <Navbar />
      <Container fluid className="mt-4">
        <Row>
          <Col lg={2} className="d-none d-lg-block">
            <Nav variant="pills" className="flex-column sticky-top">
              <Nav.Item>
                <Nav.Link 
                  active={getActiveKey() === 'feed'} 
                  onClick={() => handleSelect('feed')}
                  className="mb-2"
                >
                  📰 My Feed
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={getActiveKey() === 'suggestions'} 
                  onClick={() => handleSelect('suggestions')}
                  className="mb-2"
                >
                  🎯 AI Suggestions
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={getActiveKey() === 'investors'} 
                  onClick={() => handleSelect('investors')}
                  className="mb-2"
                >
                  👥 Find Investors
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={getActiveKey() === 'profile'} 
                  onClick={() => handleSelect('profile')}
                  className="mb-2"
                >
                  ⚙️ Profile
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          
          <Col lg={10}>
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/suggestions" element={<Suggestions />} />
              <Route path="/investors" element={<InvestorList />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;