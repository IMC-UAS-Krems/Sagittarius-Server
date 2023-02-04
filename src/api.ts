import express from "express";
// import { Request } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import cors from "cors";
// import proxy from "express-http-proxy";
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

  // // Create a proxy router that receives requests from localhost:3000 and redirects them to localhost:8796
  // const proxyRouter = proxy("localhost:8796", {
  //   proxyReqBodyDecorator: (content: any, req: Request) => {
  //     const source = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  //   }
  // })

  app.listen(port, () => {
    console.log(`Sagittarius server listening at http://localhost:${port}`);
  });
};
