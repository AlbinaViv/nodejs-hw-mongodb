import { ContactsCollection } from '../db/models/contact.js';

// export const getAllContacts = async (page, perPage) => {
//   const skip = (page - 1) * perPage;
//   const data = await ContactsCollection.find()
//     .skip(skip)
//     .limit(Number(perPage));
//   const totalItems = await ContactsCollection.countDocuments();
//   const totalPages = Math.ceil(totalItems / perPage);

//   return { data, totalItems, totalPages };
// };

export const getAllContacts = async (
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
) => {
  const skip = (page - 1) * perPage;
  const sortDirection = sortOrder === 'desc' ? -1 : 1;

  const totalItems = await ContactsCollection.countDocuments();
  const contacts = await ContactsCollection.find()
    .sort({ [sortBy]: sortDirection })
    .skip(skip)
    .limit(perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages: Math.ceil(totalItems / perPage),
    hasPreviousPage: page > 1,
    hasNextPage: page < Math.ceil(totalItems / perPage),
  };
};

export const getContactById = async (contactId) => {
  return ContactsCollection.findById(contactId);
};

export const createContact = async (contactData) => {
  return ContactsCollection.create(contactData);
};

export const updateContact = async (contactId, contactData) => {
  return ContactsCollection.findByIdAndUpdate(contactId, contactData, {
    new: true,
  });
};

export const deleteContact = async (contactId) => {
  return ContactsCollection.findByIdAndDelete(contactId);
};
