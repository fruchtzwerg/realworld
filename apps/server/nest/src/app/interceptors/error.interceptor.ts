import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { RequestValidationError } from '@ts-rest/nest';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((err: unknown) => {
        const error = err as RequestValidationError | { message?: string };
        const message =
          error instanceof RequestValidationError ? error.body : error.message || error;

        Logger.error(message, context.getClass().name);

        throw new HttpException(message as string, HttpStatus.UNPROCESSABLE_ENTITY);
      })
    );
  }
}
