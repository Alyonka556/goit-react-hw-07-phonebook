export const getContacts = state => state.contacts.value;
export const getFilter = state => state.filter.input;
export const SelectLoading = state => state.contacts.isLoading;
export const SelectError = state => state.contacts.error;
