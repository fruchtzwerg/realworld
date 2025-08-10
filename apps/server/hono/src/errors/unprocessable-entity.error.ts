import { HttpError } from './http.error';

export class UnprocessableEntityError extends HttpError {
  constructor(message = 'Unprocessable Entity') {
    super(message, 422);
  }
}
