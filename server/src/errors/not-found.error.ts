import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { CustomError } from './custom.error';

export class NotFoundError extends CustomError {
  constructor(message = getReasonPhrase(StatusCodes.NOT_FOUND)) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
