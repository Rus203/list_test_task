import { Router } from 'express';
import { ListController } from './list.controller';
import { validateData } from '@/midlewars';
import { AddOrUpdateListSchema, PaginationParamsSchema } from './shemas';

const listController = new ListController();

export const listRouter = Router();

listRouter.get(
  '/',
  validateData(PaginationParamsSchema),
  listController.get.bind(listController)
);

listRouter.post(
  '/',
  validateData(AddOrUpdateListSchema),
  listController.add.bind(listController)
);

listRouter.get('/:id', listController.getOne.bind(listController));

listRouter.patch(
  '/:id',
  validateData(AddOrUpdateListSchema),
  listController.update.bind(listController)
);

listRouter.delete('/:id', listController.delete.bind(listController));
