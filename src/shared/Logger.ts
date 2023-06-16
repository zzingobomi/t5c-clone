import { config, createLogger, format, transports } from "winston";
import Config from "./Config";

export class Logger {
  private logger;
  private service: string = "server";

  constructor(logLevel) {
    this.logger = createLogger({
      level: logLevel,
      levels: config.syslog.levels,
      format: format.combine(
        format.colorize(),
        format.prettyPrint(),
        format.splat(),
        format.printf((info) => {
          if (info instanceof Error) {
            return `[${info.level}] : ${info.timestamp} : ${info.message} ${info.stack}`;
          }
          return `[${info.level}] : ${info.timestamp} :  ${info.message}`;
        })
      ),
      transports: [
        new transports.Console({
          format: format.simple(),
        }),
      ],
    });
  }

  public changeService(service) {
    this.service = service;
  }

  public info(message, data: any = []) {
    this.logger.info(message, data);
  }

  public warning(message, data: any = []) {
    this.logger.warning(message, data);
  }

  public error(message, data: any = []) {
    this.logger.error(message, data);
  }
}

export default new Logger(Config.logLevel);
