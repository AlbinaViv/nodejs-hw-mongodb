import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  userId,
  skip,
  perPage,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
}) => {
  const contactsQuery = ContactsCollection.find({ userId });

  const contactsCount = await ContactsCollection.countDocuments({ userId });

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

export const getContactById = async (userId, contactId) => {
  return await ContactsCollection.findOne({ _id: contactId, userId });
};

export const createContact = async (userId, payload) => {
  return await ContactsCollection.create({ ...payload, userId });
};

export const updateContact = async (userId, contactId, payload) => {
  return await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true },
  );
};

export const deleteContact = async (userId, contactId) => {
  return await ContactsCollection.findOneAndDelete({ _id: contactId, userId });
};
