import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getUsers = () => api.get('/users');
export const getExpenses = (userId) => api.get(`/expenses?userId=${userId}`);
export const addExpense = (expense) => api.post('/expenses', expense);
export const updateExpense = (id, expense) => api.put(`/expenses/${id}`, expense);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);