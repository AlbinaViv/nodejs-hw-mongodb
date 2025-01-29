import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

// export const createContact = async ({
//   name,
//   phoneNumber,
//   email,
//   isFavourite,
//   contactType,
// }) => {
//   const newContact = new ContactsCollection({
//     name,
//     phoneNumber,
//     email,
//     isFavourite,
//     contactType,
//   });

//   await newContact.save();

//   return newContact;
// };

export const createContact = async (payload) => {
  return await ContactsCollection.create(payload);
};

export const updateContact = async (contactId, payload) => {
  console.log('payload', payload);

  return await ContactsCollection.findByIdAndUpdate(contactId, payload, {
    new: true,
  });
};

// export const updateContact = async (contactId, updates) => {
//   const contact = await ContactsCollection.findById(contactId);

//   if (!contact) {
//     throw { status: 404, message: 'Contact not found' };
//   }

//   const updatedContact = await contact.updateOne(updates);
//   return updatedContact;
// };

// export const deleteContact = async (contactId) => {
//   const contact = await ContactsCollection.findById(contactId);

//   if (!contact) {
//     return null;
//   }

//   await contact.deleteOne();
//   return contact;
// };

export const deleteContact = async (contactId) => {
  return await ContactsCollection.findOneAndDelete({ _id: contactId });
};
