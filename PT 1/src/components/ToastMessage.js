import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastMessage = ({ show, onClose, message, type = 'success' }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose} delay={3000} autohide bg={type}>
        <Toast.Header>
          <strong className="me-auto">{type === 'success' ? 'Success' : 'Warning'}</strong>
        </Toast.Header>
        <Toast.Body className={type === 'success' ? 'text-white' : ''}>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;