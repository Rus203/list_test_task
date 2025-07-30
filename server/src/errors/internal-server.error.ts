import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { CustomError } from './custom.error';

export class InternalServerError extends CustomError {
  constructor(message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
