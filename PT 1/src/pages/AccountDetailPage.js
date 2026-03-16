import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Image, Button, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getAccountById } from '../services/api';

const AccountDetailPage = () => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccount();
  }, [id]);

  const fetchAccount = async () => {
    try {
      const response = await getAccountById(id);
      setAccount(response.data);
    } catch (error) {
      console.error('Error fetching account:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!account) {
    return <div className="text-center mt-5">Account not found</div>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h5" className="text-center">
              Account Details
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <Image 
                  src={account.avatar || 'https://via.placeholder.com/150'} 
                  roundedCircle 
                  width="150" 
                  height="150"
                  className="border"
                />
              </div>
              
              <Row className="mb-3">
                <Col sm={4}><strong>Username:</strong></Col>
                <Col sm={8}>{account.username}</Col>
              </Row>
              
              <Row className="mb-3">
                <Col sm={4}><strong>Email:</strong></Col>
                <Col sm={8}>{account.email}</Col>
              </Row>
              
              <Row className="mb-3">
                <Col sm={4}><strong>Role:</strong></Col>
                <Col sm={8}>
                  <Badge bg={account.role === 'admin' ? 'primary' : 'secondary'}>
                    {account.role}
                  </Badge>
                </Col>
              </Row>
              
              <Row className="mb-3">
                <Col sm={4}><strong>Status:</strong></Col>
                <Col sm={8}>
                  <Badge bg={account.status === 'active' ? 'success' : 'danger'}>
                    {account.status}
                  </Badge>
                </Col>
              </Row>
              
              <div className="text-center mt-4">
                <Button variant="secondary" onClick={() => navigate('/accounts')}>
                  Back to Lists
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountDetailPage;