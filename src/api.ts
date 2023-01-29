import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import cors from "cors";

var winston = require('winston');
var expressWinston = require('express-winston');

export const run = async () => {
  const app = express();
  app.use(cors());
  const port = 8080;

  const logFormat = winston.format.printf(function(info: any) {
    return `[${new Date().toISOString()}] | [${info.level}]: ${JSON.stringify(info.message, null, 4)}`;
  });

  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(winston.format.colorize(), logFormat),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} to {{req.url}}: STATUS CODE {{res.statusCode}}. Time elapsed: {{res.responseTime}}ms",
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  }));

  
  app.use(
    "/api",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext: () => null,
    })
  );

  app.listen(port, () => {
    console.log(`Sagittarius server listening at http://localhost:${port}`);
  });
};
