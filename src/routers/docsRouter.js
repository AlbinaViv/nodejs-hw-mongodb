import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

const router = Router();

const swaggerPath = path.resolve('docs/swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
