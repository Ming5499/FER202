import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getAccounts = () => api.get('/accounts');
export const getAccountById = (id) => api.get(`/accounts/${id}`);
export const updateAccount = (id, accountData) => api.put(`/accounts/${id}`, accountData);

export default api;