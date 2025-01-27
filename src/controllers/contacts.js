import {
  getAllContacts,
  getContactById,
  updateContact,
  createContact,
  deleteContact,
} from '../services/contacts.js';
import createError from 'http-errors';

export const getAllContactsController = async (req, res) => {
  const allContacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: allContacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return next(createError(404, 'Contact not found'));
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  try {
    const newContact = await createContact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a new contact!',
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
};

export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  try {
    const updatedContact = await updateContact(contactId, {
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });

    if (!updatedContact) {
      return next(createError(404, 'Contact not found'));
    }

    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const deletedContact = await deleteContact(contactId);

    if (!deletedContact) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
