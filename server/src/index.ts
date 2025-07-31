import 'module-alias/register';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import { rootRouter } from './modules';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', rootRouter);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
