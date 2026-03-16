import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MessageModal = ({ show, onClose, onContinue, username }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center">Welcome, {username}! Login successful.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onContinue}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageModal;