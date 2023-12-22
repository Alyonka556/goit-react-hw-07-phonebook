//https://6584512e4d1ee97c6bcf791c.mockapi.io/contacts

import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://6584512e4d1ee97c6bcf791c.mockapi.io';

export const fetchContactsThunk = createAsyncThunk(
  'fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('contacts');

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'deleteContact',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`contacts/${id}`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContactsThunk = createAsyncThunk(
  'addContact',
  async ({ name, phone }, thunksAPI) => {
    try {
      const { data } = await axios.post('contacts', { name, phone });

      return data;
    } catch (error) {
      return thunksAPI.rejectWithValue(error.message);
    }
  }
);
