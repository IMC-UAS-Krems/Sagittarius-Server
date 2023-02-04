import morgan from "morgan";
import { Express } from "express";

const setupLogging = (app: Express) => {
  app.use(morgan("combined"));
}

export default setupLogging;