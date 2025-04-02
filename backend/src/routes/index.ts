import { Router, Express } from "express";
import accountRoutes from "./accountRouter";
import serverRoutes from "./serverRouter";
import friendRoutes from "./friendRouter";

const addRoutes = (app: Express) => {
  const router = Router();

  accountRoutes(router);
  serverRoutes(router);
  friendRoutes(router);

  app.use("/rest", router);
};

export default addRoutes;
