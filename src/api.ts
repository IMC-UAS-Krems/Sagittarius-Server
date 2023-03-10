import express from "express";
import setupLogging from "./logger";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import cors from "cors";

export const run = async () => {
  const app = express();

  app.use(cors(
    {
      origin: [process.env.CLIENT_URL || "http://localhost", "http://localho.st:3000"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      optionsSuccessStatus: 200,
    }
  ));

  const port = 8080;

  setupLogging(app);

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
