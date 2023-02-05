import express from "express";
import setupLogging from "./logger";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

export const run = async () => {
  const app = express();
  app.use(cors());
  const port = 8080;

  setupLogging(app);

  const proxy = createProxyMiddleware({
    target: "http://localhost:8796",
    changeOrigin: true,
  })

  app.use('/compile', proxy);

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
