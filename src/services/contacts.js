import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async ({
  name,
  phoneNumber,
  email,
  isFavourite,
  contactType,
}) => {
  const newContact = new ContactsCollection({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  await newContact.save();

  return newContact;
};

export const updateContact = async (contactId, updates) => {
  const contact = await ContactsCollection.findById(contactId);

  if (!contact) {
    throw { status: 404, message: 'Contact not found' };
  }

  const updatedContact = await contact.update(updates);
  return updatedContact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);

  if (!contact) {
    return null;
  }

  await contact.remove();
  return contact;
};
