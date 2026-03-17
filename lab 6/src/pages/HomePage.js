import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TotalCard from '../components/TotalCard';
import Filter from '../components/Filter';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import { 
  fetchExpenses, 
  addExpense, 
  updateExpense, 
  deleteExpense,
  setFilterCategory 
} from '../store/slices/expenseSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { filteredItems: expenses, filterCategory, loading } = useSelector((state) => state.expenses);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchExpenses(user.id));
    }
  }, [dispatch, user]);

  const handleAdd = async (expenseData) => {
    const newExpense = { ...expenseData, userId: user.id };
    dispatch(addExpense(newExpense));
  };

  const handleUpdate = async (id, expenseData) => {
    dispatch(updateExpense({ id, expenseData }));
    setEditingExpense(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      dispatch(deleteExpense(id));
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const cancelEdit = () => {
    setEditingExpense(null);
  };

  const handleFilterChange = (category) => {
    dispatch(setFilterCategory(category));
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <TotalCard expenses={expenses} />
          </Col>
          <Col md={8}>
            <Filter 
              filterCategory={filterCategory} 
              setFilterCategory={handleFilterChange} 
            />
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
              expenses={expenses}
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