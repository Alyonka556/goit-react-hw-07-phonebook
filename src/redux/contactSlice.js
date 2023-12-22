import { createSlice } from '@reduxjs/toolkit';
import {
  addContactsThunk,
  deleteContactThunk,
  fetchContactsThunk,
} from './operations';

const initialState = { value: [], isLoading: false, error: null };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(fetchContactsThunk.fulfilled, (state, { payload }) => {
        state.value = payload;
        state.isLoading = false;
      })
      .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        state.value = state.value.filter(value => value.id !== payload.id);
      })
      .addCase(addContactsThunk.fulfilled, (state, { payload }) => {
        state.value.push(payload);
      })
      .addCase(fetchContactsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContactsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
