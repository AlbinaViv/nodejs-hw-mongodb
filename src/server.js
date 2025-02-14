import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

dotenv.config();

const PORT = Number(env('PORT', '3000'));

export function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use(router);

  app.use(errorHandler);
  app.use('*', notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}
