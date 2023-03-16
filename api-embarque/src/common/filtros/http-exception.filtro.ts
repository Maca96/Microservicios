import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  
  @Catch()
  export class TodasExepcionesFiltro implements ExceptionFilter {
    private readonly logger = new Logger(TodasExepcionesFiltro.name)
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const res = ctx.getResponse();
      const req = ctx.getRequest();
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      const msg = exception instanceof HttpException ? exception.getResponse() : exception;
      this.logger.error(`Status ${status} Error: ${JSON.stringify(msg)}`);
      res.status(status).json({
          timestamps: new Date().toISOString(),
          path:req.url,
          error:msg,
      })
    }
  }