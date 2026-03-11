import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp) => (
          <tr key={exp.id}>
            <td>{exp.name}</td>
            <td>{Number(exp.amount).toLocaleString('vi-VN')} ₫</td>
            <td>{exp.category}</td>
            <td>{formatDate(exp.date)}</td>
            <td>
              <Button variant="warning" size="sm" onClick={() => onEdit(exp)} className="me-2">
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(exp.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
        {expenses.length === 0 && (
          <tr>
            <td colSpan="5" className="text-center">
              No expenses found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ExpenseTable;