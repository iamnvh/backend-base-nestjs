import { Injectable, Scope } from '@nestjs/common';
import { Logger, transports, createLogger } from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  private logger: Logger;
  private context?: string;

  public setContext(context: string): void {
    this.context = context;
  }

  constructor() {
    this.logger = createLogger({
      transports: [
        new transports.Console({}),
        new transports.File({ filename: 'src/shared/log/combined.log' }),
      ],
    });
  }

  error(message: string, meta?: Record<string, any>): Logger {
    const timesamp = new Date().toISOString();
    return this.logger.error({
      message,
      contextName: this.context,
      timesamp,
      ...meta,
    });
  }

  log(message: string, meta: Record<string, any>): Logger {
    const timesamp = new Date().toISOString();
    return this.logger.info({
      message,
      contextName: this.context,
      timesamp,
      ...meta,
    });
  }
}
