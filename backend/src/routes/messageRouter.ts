import { Router } from "express";
import { checkAuth } from "../middleware/isLogginMiddleware";
import { sendMessage } from "../controllers/message/sendMessage";
import { getConversation } from "../controllers/message/getConversation";
import { deleteMessage } from "../controllers/message/deleteMessage";
import { getMessagesBySender } from "../controllers/message/getMessagesBySender";
import { getMessagesByReceived } from "../controllers/message/getMessagesByReceived";

const MessageRouter = (app: Router) => {
  const router = Router();

  // Invia un nuovo messaggio
  router.post("/", sendMessage);

  // Ottieni conversazione tra due utenti
  router.get("/conversation", getConversation);

  // Ottieni messaggi ricevuti
  router.get("/received", getMessagesByReceived);

  // Ottieni messaggi inviati
  router.get("/sender", getMessagesBySender);

  // Elimina un messaggio
  router.delete("/:messageId", deleteMessage);

  app.use("/message", [checkAuth], router);
};
export default MessageRouter;
