import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  updateContact,
  createContact,
  deleteContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getAllContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { _id: userId } = req.user;

  const skip = (page - 1) * perPage;

  try {
    const contactsData = await getAllContacts({
      userId,
      page,
      skip,
      perPage,
      sortBy,
      sortOrder,
    });

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contactsData,
    });
  } catch (err) {
    next(err);
  }
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  try {
    const contact = await getContactById(userId, contactId);

    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

export const createContactController = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  const { _id: userId } = req.user;

  try {
    const newContact = await createContact(userId, {
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

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  try {
    const updatedContact = await updateContact(userId, contactId, req.body);

    if (!updatedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully updated contact!',
      data: updatedContact,
    });
  } catch (err) {
    next(err);
  }
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  try {
    const result = await updateContact(userId, contactId, req.body, {
      upsert: true,
      new: true,
    });

    if (!result) {
      return next(createHttpError(404, 'Contact not found'));
    }

    const status = result.isNew ? 201 : 200;

    res.status(status).json({
      status,
      message: 'Successfully upserted a contact!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  try {
    const deletedContact = await deleteContact(userId, contactId);

    if (!deletedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
