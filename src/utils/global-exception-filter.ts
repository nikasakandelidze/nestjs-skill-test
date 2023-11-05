import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  private logger: Logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // If it's a known HttpException, use the built-in handler
    if (exception instanceof HttpException) {
      super.catch(exception, host);
      return;
    }
    // Handle other unknown exceptions as internal server errors
    this.logger.warn(exception);
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = "Internal server error. Please try again later.";
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
