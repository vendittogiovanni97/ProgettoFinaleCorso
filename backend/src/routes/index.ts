import { Router } from "express";
import accountRouter from "./accountRouter";

const addRoutes = (app: Router) => {
  app.use("/account", accountRouter);
};

export default addRoutes;
