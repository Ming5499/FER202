import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const ExpenseForm = ({ onSubmit, editingExpense, cancelEdit }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingExpense) {
      setName(editingExpense.name);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      // Convert date to yyyy-mm-dd for input
      setDate(editingExpense.date.split('T')[0] || editingExpense.date);
    } else {
      // Reset form
      setName('');
      setAmount('');
      setCategory('');
      setDate('');
    }
  }, [editingExpense]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!category.trim()) newErrors.category = 'Category is required';
    if (!amount) newErrors.amount = 'Amount is required';
    else if (isNaN(amount) || Number(amount) <= 0)
      newErrors.amount = 'Amount must be a positive number';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const expenseData = {
      name,
      amount: Number(amount),
      category,
      date,
    };

    if (editingExpense) {
      onSubmit(editingExpense.id, expenseData);
    } else {
      onSubmit(expenseData);
    }

    if (!editingExpense) {
      // Clear form after add
      setName('');
      setAmount('');
      setCategory('');
      setDate('');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{editingExpense ? 'Edit Expense' : 'Add Expense'}</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              isInvalid={!!errors.amount}
            />
            <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              isInvalid={!!errors.category}
            />
            <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              {editingExpense ? 'Update Expense' : 'Add Expense'}
            </Button>
            {editingExpense && (
              <Button variant="secondary" onClick={cancelEdit}>
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ExpenseForm;