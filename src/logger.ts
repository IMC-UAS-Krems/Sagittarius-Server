import { createLogger, transports, format } from "winston";
import { logger, errorLogger } from "express-winston";

const appLogger = createLogger({
    transports: [new transports.Console()],
    level: "error",
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(({ timestamp, level, message, meta }) => {
        return `🕒 ${timestamp} | <${level}>: ${message}, STATUS CODE ${JSON.stringify(meta, null, 4)}`;
      })
    ),
  });

export default appLogger;

export const loggerMiddleware = logger(appLogger);
