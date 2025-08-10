import { ContentfulStatusCode } from 'hono/utils/http-status';

import { errorDto } from '../dto/error.dto';

export class HttpError extends Error {
  public readonly body = errorDto([this.message]);

  constructor(message: string, public status: ContentfulStatusCode) {
    super(message);
  }
}
