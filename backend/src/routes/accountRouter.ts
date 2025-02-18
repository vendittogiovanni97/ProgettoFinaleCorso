import { Router } from "express";
import { register } from "../controllers/register.contr";


const accountRoutes = (app:Router) => {
  const router = Router();

  router.post("/register", register);
  router.post("/login",);
  router.post("/logout",);
  router.put("/password",)

  app.use("/account", router)
}

export default accountRoutes