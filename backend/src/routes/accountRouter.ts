import { Router } from "express";
import login from "../controllers/auth/login.contr";
import { checkAuth } from "../middleware/isLogginMiddleware";
import { logout } from "../controllers/auth/loggout";
import { register } from "../controllers/auth/register.contr";
import resetPassword from "../controllers/auth/resetpassword";
import { Request, Response, NextFunction } from "express";
import { RegisterInfo } from "../types/infoSchema";

const router = Router();

router.get("/test", (req, res) => {
  res.json({ ok: true });
});
router.post("/register", async (req: Request<undefined, unknown, RegisterInfo>, res: Response, next: NextFunction) => {
  try {
    await register(req, res);
  } catch (error) {
    console.error("Errore nel router di registrazione:", error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Errore interno del server durante la registrazione"
      });
    }
  }
});
router.post("/login", login);
router.post("/logout", [checkAuth], logout);
router.put("/password", resetPassword);

export default router;
