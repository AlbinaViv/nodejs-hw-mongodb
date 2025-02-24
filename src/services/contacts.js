import { ContactCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  userId,
  skip,
  perPage,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
}) => {
  const contactsQuery = ContactCollection.find({ userId });

  const contactsCount = await ContactCollection.countDocuments({ userId });

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
  return await ContactCollection.findOne({ _id: contactId, userId });
};

export const createContact = async (userId, payload) => {
  return await ContactCollection.create({ ...payload, userId });
};

export const updateContact = async (userId, contactId, payload) => {
  return await ContactCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true },
  );
};

export const deleteContact = async (userId, contactId) => {
  return await ContactCollection.findOneAndDelete({ _id: contactId, userId });
};
// import { ContactCollection } from '../db/models/contact.js';
// import { calculatePaginationData } from '../utils/calculatePaginationData.js';
// import { SORT_ORDER } from '../constants/index.js';

// export const getAllContacts = async ({
//   userId,
//   skip,
//   perPage,
//   sortBy = 'name',
//   sortOrder = SORT_ORDER.ASC,
// }) => {
//   console.log('getAllContacts called with:', {
//     userId,
//     skip,
//     perPage,
//     sortBy,
//     sortOrder,
//   });

//   try {
//     const contactsQuery = ContactCollection.find({ userId });
//     const contactsCount = await ContactCollection.countDocuments({ userId });
//     console.log('Total contacts found:', contactsCount);

//     const contacts = await contactsQuery
//       .skip(skip)
//       .limit(perPage)
//       .sort({ [sortBy]: sortOrder })
//       .exec();

//     console.log('Contacts retrieved:', JSON.stringify(contacts, null, 2));

//     const paginationData = calculatePaginationData(
//       contactsCount,
//       perPage,
//       Math.ceil((skip + 1) / perPage),
//     );

//     return {
//       data: contacts,
//       ...paginationData,
//     };
//   } catch (error) {
//     console.error('Error in getAllContacts:', error);
//     throw error;
//   }
// };

// export const getContactById = async (userId, contactId) => {
//   console.log('getContactById called with:', { userId, contactId });
//   try {
//     const contact = await ContactCollection.findOne({ _id: contactId, userId });
//     console.log('Contact found:', JSON.stringify(contact, null, 2));
//     return contact;
//   } catch (error) {
//     console.error('Error in getContactById:', error);
//     throw error;
//   }
// };

// export const createContact = async (userId, payload) => {
//   console.log('createContact called with:', { userId, payload });
//   try {
//     const newContact = await ContactCollection.create({ ...payload, userId });
//     console.log('Contact created:', JSON.stringify(newContact, null, 2));
//     return newContact;
//   } catch (error) {
//     console.error('Error in createContact:', error);
//     throw error;
//   }
// };

// export const updateContact = async (userId, contactId, payload) => {
//   console.log('updateContact called with:', { userId, contactId, payload });
//   try {
//     const updatedContact = await ContactCollection.findOneAndUpdate(
//       { _id: contactId, userId },
//       payload,
//       { new: true },
//     );
//     console.log('Updated contact:', JSON.stringify(updatedContact, null, 2));
//     return updatedContact;
//   } catch (error) {
//     console.error('Error in updateContact:', error);
//     throw error;
//   }
// };

// export const deleteContact = async (userId, contactId) => {
//   console.log('deleteContact called with:', { userId, contactId });
//   try {
//     const deletedContact = await ContactCollection.findOneAndDelete({
//       _id: contactId,
//       userId,
//     });
//     console.log('Deleted contact:', JSON.stringify(deletedContact, null, 2));
//     return deletedContact;
//   } catch (error) {
//     console.error('Error in deleteContact:', error);
//     throw error;
//   }
// };
