import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TotalCard from '../components/TotalCard';
import Filter from '../components/Filter';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../services/api';

const HomePage = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);

  const fetchExpenses = async () => {
    if (!user?.id) return;
    const response = await getExpenses(Number(user.id));
    setExpenses(response.data);
  };

  const handleAdd = async (expense) => {
    const newExpense = { ...expense, userId: Number(user.id) };
    await addExpense(newExpense);
    fetchExpenses();
  };

  const handleUpdate = async (id, updatedExpense) => {
    await updateExpense(id, updatedExpense);
    setEditingExpense(null);
    fetchExpenses();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deleteExpense(id);
      fetchExpenses();
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const cancelEdit = () => {
    setEditingExpense(null);
  };

  const filteredExpenses = expenses.filter((exp) =>
    exp.category.toLowerCase().includes(filterCategory.toLowerCase())
  );

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <TotalCard expenses={filteredExpenses} />
          </Col>
          <Col md={8}>
            <Filter filterCategory={filterCategory} setFilterCategory={setFilterCategory} />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <ExpenseForm
              onSubmit={editingExpense ? handleUpdate : handleAdd}
              editingExpense={editingExpense}
              cancelEdit={cancelEdit}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <ExpenseTable
              expenses={filteredExpenses}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
