import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';

dotenv.config();

const PORT = Number(env('PORT', '3000'));

export function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use('/contacts', contactsRouter);

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      message: error.message || 'Something went wrong',
    });
    console.error(error.stack);
    next();
  });

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}
