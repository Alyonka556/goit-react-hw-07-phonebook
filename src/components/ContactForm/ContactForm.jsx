import React, { useState } from 'react';

import {
  StyledWrapper,
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledButton,
} from './ContactForm.styled';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    addContact({ name, number });

    setName('');
    setNumber('');
  };

  return (
    <StyledWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>Name </StyledLabel>
        <StyledInput
          type="text"
          name="name"
          required
          placeholder="Enter name"
          value={name}
          onChange={handleChange}
        />
        <StyledLabel>Number </StyledLabel>
        <StyledInput
          type="tel"
          name="number"
          required
          placeholder="Enter phone number"
          value={number}
          onChange={handleChange}
        />
        <StyledButton type="submit">Add contact</StyledButton>
      </StyledForm>
    </StyledWrapper>
  );
};
