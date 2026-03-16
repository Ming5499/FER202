import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAccounts } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import MessageModal from '../components/MessageModal';

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loginSuccessUser, setLoginSuccessUser] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const newErrors = {};
    if (!usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = 'Username or Email is required.';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await getAccounts();
      const accounts = response.data;
      
      const account = accounts.find(acc => 
        (acc.username === usernameOrEmail || acc.email === usernameOrEmail) && 
        acc.password === password
      );

      if (!account) {
        alert('Invalid username/email or password!');
        return;
      }

      if (account.role !== 'admin') {
        alert('Access denied. Only admin users can log in.');
        return;
      }

      if (account.status === 'locked') {
        alert('Account is locked. Please contact admin.');
        return;
      }

      setLoginSuccessUser(account);
      setShowModal(true);
      
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    login(loginSuccessUser);
    navigate('/accounts');
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username or Email</Form.Label>
          <Form.Control
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            isInvalid={!!errors.usernameOrEmail}
          />
          <Form.Control.Feedback type="invalid">
            {errors.usernameOrEmail}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>

      <MessageModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onContinue={handleContinue}
        username={loginSuccessUser?.username}
      />
    </Container>
  );
};

export default LoginPage;