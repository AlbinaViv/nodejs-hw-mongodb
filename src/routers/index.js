import { Router } from 'express';
import authRouter from './auth.js';
import contactsRouter from './contacts.js';
import docsRouter from './docsRouter.js';

const router = Router();

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);
router.use('/api-docs', docsRouter);

export default router;
