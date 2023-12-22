import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import { filterReducer } from './filterSlice';
import { contactsReducer } from './contactSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    contacts: contactsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
