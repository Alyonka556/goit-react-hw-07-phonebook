import { ContactForm } from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter.jsx';

import { StyledContainer, StyledTitle } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  SelectError,
  SelectLoading,
  getContacts,
  getFilter,
} from '../redux/selector.js';
import { addFilter } from '../redux/filterSlice';

import { useEffect } from 'react';
import {
  addContactsThunk,
  deleteContactThunk,
  fetchContactsThunk,
} from '../redux/operations';

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const loading = useSelector(SelectLoading);
  const error = useSelector(SelectError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  const handleChange = value => {
    dispatch(addFilter(value));
  };

  const handleSubmit = ({ name, phone }) => {
    const contactExists = contacts.some(contact => contact.name === name);

    if (contactExists) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(addContactsThunk({ name, phone }));
    }
  };

  const handleDelete = id => {
    dispatch(deleteContactThunk(id));
  };

  const getFilteredContacts = () => {
    const filterContactsList = contacts.filter(
      contact =>
        typeof contact.name === 'string' &&
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filterContactsList;
  };

  const filteredContacts = getFilteredContacts();

  return (
    <StyledContainer>
      <StyledTitle>Phonebook</StyledTitle>
      <ContactForm addContact={handleSubmit} />
      <StyledTitle>Contacts</StyledTitle>
      <Filter filter={filter} handleChange={handleChange} />
      <ContactList contacts={filteredContacts} handleDelete={handleDelete} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
    </StyledContainer>
  );
};
