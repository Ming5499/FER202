import React from 'react';
import { Card } from 'react-bootstrap';

const TotalCard = ({ expenses }) => {
  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const formattedTotal = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(total);

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Total Expenses</Card.Title>
        <Card.Text className="display-6">{formattedTotal}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TotalCard;