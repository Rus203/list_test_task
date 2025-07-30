import { NotFoundError } from '@/errors';
import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

export class AppController {
  public async healthCheck(_: Request, res: Response): Promise<void> {
    const message = `Now is ${new Date()}`;

    res.status(StatusCodes.CREATED).send({ message });
  }

  public async notFoundRoute(): Promise<void> {
    throw new NotFoundError('Route not found');
  }
}
