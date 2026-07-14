import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ORPCError } from '@orpc/nest';
import { Request, Response } from 'express';

@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const requestInfo = `${request.method} ${request.url}`;

    let body: unknown;
    let logMessage: string;
    let stack: string | undefined;
    let status = HttpStatus.UNPROCESSABLE_ENTITY;

    if (exception instanceof UnauthorizedException || exception instanceof ForbiddenException) {
      status = exception.getStatus();
      body = { errors: { body: [exception.message] } };
      logMessage = `${exception.name}: ${exception.message}`;
      stack = exception.stack;
    } else if (exception instanceof ORPCError) {
      status = exception.status;
      body = exception.toJSON();
      logMessage = `ORPCError[${exception.code}]: ${exception.message}`;
      stack = exception.stack;
    } else if (exception instanceof HttpException) {
      const res = exception.getResponse();
      body = typeof res === 'string' ? { errors: { body: [res] } } : res;
      logMessage = `${exception.name}: ${exception.message}`;
      stack = exception.stack;
    } else if (exception instanceof Error) {
      body = { errors: { body: [exception.message] } };
      logMessage = `${exception.name}: ${exception.message}`;
      stack = exception.stack;
    } else {
      body = { errors: { body: ['Internal server error'] } };
      logMessage = `Unknown: ${String(exception)}`;
    }

    this.logger.error(`${requestInfo} ${logMessage}`, stack);

    response.status(status).json(body);
  }
}
