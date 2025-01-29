import { ContactsCollection } from '../db/models/contact.js';

<<<<<<< Updated upstream
export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
=======
export const getAllContacts = async (query) => {
  const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc' } = query;

  const sortOptions = {
    [sortBy]: sortOrder === 'desc' ? -1 : 1,
  };

  const skip = (page - 1) * perPage;

  const contacts = await ContactsCollection.find()
    .sort(sortOptions)
    .skip(skip)
    .limit(Number(perPage));

  const totalItems = await ContactsCollection.countDocuments();
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data: contacts,
    page: Number(page),
    perPage: Number(perPage),
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
>>>>>>> Stashed changes
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

  const updatedContact = await contact.updateOne(updates);
  return updatedContact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);

  if (!contact) {
    return null;
  }

  await contact.deleteOne();
  return contact;
};
