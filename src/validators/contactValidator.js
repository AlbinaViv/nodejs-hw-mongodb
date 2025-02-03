import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  // email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  // isFavourite: Joi.boolean().default(false),
  contactType: Joi.string().valid('home', 'work', 'other').required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phoneNumber: Joi.string().min(3).max(20),
  contactType: Joi.string().valid('home', 'work', 'other'),
}).or('name', 'email', 'phoneNumber', 'isFavourite', 'contactType');
