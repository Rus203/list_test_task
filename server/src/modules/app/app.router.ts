import { Router } from 'express';
import { AppController } from './app.controller';

const appController = new AppController();

export const appRouter = Router();

appRouter.get('/health-check', appController.healthCheck.bind(appController));

appRouter.use(appController.notFoundRoute.bind(appController));
