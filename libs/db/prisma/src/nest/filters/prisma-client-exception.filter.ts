import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  override catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    Logger.error(exception, exception.code);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2000':
      case 'P2002':
      case 'P2025': {
        const statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
        return response.status(statusCode).json({ statusCode, message: exception });
      }

      default:
        return super.catch(exception, host);
    }
  }
}
