import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { BadRequestError, InternalServerError } from '@/errors';

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ ...req.body, ...req.query });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = JSON.parse(error.message).reduce(
          (acc: string, issue: any) =>
            (acc += `${issue.path.join('.')} is ${issue.message}.`),
          ''
        );

        throw new BadRequestError(errorMessages);
      } else {
        throw new InternalServerError();
      }
    }
  };
}
