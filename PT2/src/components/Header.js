import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center gap-2">
          <img
            alt="logo"
            src="/logo.jpg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          PersonalBudget
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="me-3">
            Signed in as: <strong>{user?.fullName}</strong>
          </Navbar.Text>
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
