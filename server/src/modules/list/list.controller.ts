import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ListService } from './list.service';
import { AddOrUpdateListItemType } from './shemas';

export class ListController {
  private service: ListService;

  constructor() {
    this.service = new ListService();
  }

  public async add(req: Request, res: Response): Promise<void> {
    const body: AddOrUpdateListItemType = req.body;

    const newRecord = await this.service.add(body);

    res.status(StatusCodes.CREATED).send(newRecord);
  }

  public async get(req: Request, res: Response): Promise<void> {
    const params = req.query;

    const records = await this.service.get(params);

    res.status(StatusCodes.OK).send(records);
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    const itemId = req.params.id;

    const record = await this.service.getOne(itemId);

    res.status(StatusCodes.OK).send(record);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const itemId = req.params.id;
    const body = req.body;

    const updatedRecoed = await this.service.update(itemId, body);

    res.status(StatusCodes.OK).send(updatedRecoed);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const itemId = req.params.id;
    await this.service.delete(itemId);

    res.status(StatusCodes.NO_CONTENT).send();
  }
}
