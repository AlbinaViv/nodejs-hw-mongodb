import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  skip,
  perPage,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
}) => {
  const contactsQuery = ContactsCollection.find();

  const contactsCount = await ContactsCollection.countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(
    contactsCount,
    perPage,
    Math.ceil((skip + 1) / perPage),
  );

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  return await ContactsCollection.create(payload);
};

export const updateContact = async (contactId, payload) => {
  return await ContactsCollection.findByIdAndUpdate(contactId, payload, {
    new: true,
  });
};

export const deleteContact = async (contactId) => {
  return await ContactsCollection.findOneAndDelete({ _id: contactId });
};
