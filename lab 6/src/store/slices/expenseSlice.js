import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getExpenses(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addExpense = createAsyncThunk(
  'expenses/addExpense',
  async (expenseData, { rejectWithValue }) => {
    try {
      const response = await api.addExpense(expenseData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateExpense = createAsyncThunk(
  'expenses/updateExpense',
  async ({ id, expenseData }, { rejectWithValue }) => {
    try {
      const response = await api.updateExpense(id, expenseData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteExpense(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  filteredItems: [],
  filterCategory: '',
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
      state.filteredItems = state.items.filter(exp => 
        exp.category.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    clearFilter: (state) => {
      state.filterCategory = '';
      state.filteredItems = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch expenses
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add expense
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.filteredItems = state.items.filter(exp => 
          exp.category.toLowerCase().includes(state.filterCategory.toLowerCase())
        );
      })
      // Update expense
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.items.findIndex(exp => exp.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
          state.filteredItems = state.items.filter(exp => 
            exp.category.toLowerCase().includes(state.filterCategory.toLowerCase())
          );
        }
      })
      // Delete expense
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.items = state.items.filter(exp => exp.id !== action.payload);
        state.filteredItems = state.items.filter(exp => 
          exp.category.toLowerCase().includes(state.filterCategory.toLowerCase())
        );
      });
  },
});

export const { setFilterCategory, clearFilter } = expenseSlice.actions;
export default expenseSlice.reducer;