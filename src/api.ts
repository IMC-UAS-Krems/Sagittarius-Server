import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import cors from "cors";

import { loggerMiddleware } from "./logger";

export const run = async () => {
  const app = express();
  app.use(cors());
  const port = 8080;

  app.use(loggerMiddleware);

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
