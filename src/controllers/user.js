import { createUser } from '../services/auth';

export const createUserController = async (req, res) => {
  const user = await createUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a user!',
    data: user,
  });
};
