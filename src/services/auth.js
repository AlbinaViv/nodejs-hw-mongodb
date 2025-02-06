import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';
import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';

export const registerUser = async (name, email, password) => {
  const existingUser = await UsersCollection.findOne({ email });
  if (existingUser) {
    throw new createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = new UsersCollection({
    name,
    email,
    password: encryptedPassword,
  });

  await newUser.save();

  return newUser;
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const refreshUserSession = async (refreshToken) => {
  const session = await SessionsCollection.findOne({ refreshToken });
  if (!session) {
    throw createHttpError(404, 'Session not found');
  }

  const user = await UsersCollection.findById(session.userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  await SessionsCollection.deleteOne({ refreshToken });

  const newAccessToken = randomBytes(30).toString('base64');
  const newRefreshToken = randomBytes(30).toString('base64');

  const newSession = await SessionsCollection.create({
    userId: user._id,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });

  return newSession;
};

export const logoutUser = async (sessionId, refreshToken) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(404, 'Session not found');
  }

  await SessionsCollection.deleteOne({ _id: sessionId });

  return true;
};
