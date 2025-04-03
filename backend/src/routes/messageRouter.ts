import { Router } from "express";
import { checkAuth } from "../middleware/isLogginMiddleware";
import { sendMessage } from "../controllers/message/sendMessage";
import { getConversation } from "../controllers/message/getConversation";

const MessageRouter = (app: Router) => {
  const router = Router();

  // Invia un nuovo messaggio
  router.post("/", sendMessage);

  // Ottieni conversazione tra due utenti
  router.get("/conversation", getConversation);

  // Ottieni messaggi ricevuti
  router.get("/received");

  // Ottieni messaggi inviati
  router.get("/sent");

  // Elimina un messaggio
  router.delete("/:messageId");

  // Ottieni conteggio messaggi non letti
  router.get("/unread/:userId");

  // Ottieni conversazioni recenti
  router.get("/conversations/:userId");

  app.use("/message", [checkAuth], router);
};
export default MessageRouter;
