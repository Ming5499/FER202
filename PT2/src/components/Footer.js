import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-muted py-3 mt-5">
      <Container>
        &copy; {new Date().getFullYear()} PersonalBudget. All rights reserved.
      </Container>
    </footer>
  );
};

export default Footer;