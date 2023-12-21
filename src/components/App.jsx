// import React, { useEffect, useState } from 'react';
// import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter.jsx';

import { StyledContainer, StyledTitle } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from '../redux/selector.js';
import { addFilter } from '../redux/filterSlice';
import { addContact, deleteContact } from '../redux/contactSlice';

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleChange = value => {
    dispatch(addFilter(value));
  };

  const handleSubmit = ({ name, number }) => {
    const contactExists = contacts.some(contact => contact.name === name);

    if (contactExists) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(addContact(name, number));
    }
  };

  const handleDelete = id => {
    dispatch(deleteContact(id));
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
    </StyledContainer>
  );
};
