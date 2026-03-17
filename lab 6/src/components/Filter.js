import React from 'react';
import { Form, Card } from 'react-bootstrap';

const Filter = ({ filterCategory, setFilterCategory }) => {
  return (
    <Card>
      <Card.Body>
        <Form.Group>
          <Form.Label>Filter by Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., Food"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default Filter;