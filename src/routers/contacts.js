import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validators/contactValidator.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ContactCollection } from '../db/models/contact.js';

const router = express.Router();

router.use(authenticate);

router.get(
  '/',
  ctrlWrapper(async (req, res, next) => {
    try {
      const contacts = await ContactCollection.find({ userId: req.user._id });
      res.status(200).json(contacts);
    } catch (error) {
      next(error);
    }
  }),
);

router.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(async (req, res, next) => {
    try {
      const contact = await ContactCollection.findOne({
        _id: req.params.contactId,
        userId: req.user._id,
      });

      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }

      res.status(200).json(contact);
    } catch (error) {
      next(error);
    }
  }),
);

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(async (req, res, next) => {
    try {
      const newContact = new ContactCollection({
        ...req.body,
        userId: req.user._id,
      });
      await newContact.save();
      res.status(201).json(newContact);
    } catch (error) {
      next(error);
    }
  }),
);

router.put(
  '/:contactId',
  isValidId,
  validateBody(createContactSchema),
  ctrlWrapper(async (req, res, next) => {
    try {
      const updatedContact = await ContactCollection.findOneAndUpdate(
        { _id: req.params.contactId, userId: req.user._id },
        { ...req.body },
        { new: true },
      );

      if (!updatedContact) {
        return res
          .status(404)
          .json({ message: 'Contact not found or not authorized' });
      }

      res.status(200).json(updatedContact);
    } catch (error) {
      next(error);
    }
  }),
);

router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(async (req, res, next) => {
    try {
      const updatedContact = await ContactCollection.findOneAndUpdate(
        { _id: req.params.contactId, userId: req.user._id },
        { ...req.body },
        { new: true },
      );

      if (!updatedContact) {
        return res
          .status(404)
          .json({ message: 'Contact not found or not authorized' });
      }

      res.status(200).json(updatedContact);
    } catch (error) {
      next(error);
    }
  }),
);

router.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(async (req, res, next) => {
    try {
      const deletedContact = await ContactCollection.findOneAndDelete({
        _id: req.params.contactId,
        userId: req.user._id,
      });

      if (!deletedContact) {
        return res
          .status(404)
          .json({ message: 'Contact not found or not authorized' });
      }

      res.status(200).json({ message: 'Contact deleted' });
    } catch (error) {
      next(error);
    }
  }),
);

export default router;
