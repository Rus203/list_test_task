import { Router } from 'express';
import { listRouter } from './list';
import { appRouter } from './app';
import { globalErrorHandleMiddleware } from '@/midlewars';

export const rootRouter = Router();

rootRouter.use('/list', listRouter);

rootRouter.use('/', appRouter);

rootRouter.use(globalErrorHandleMiddleware);
