import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import { rootRouter } from './modules';

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', rootRouter);

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`);
});
