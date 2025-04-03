import { Router } from "express";
import { checkAuth } from "../middleware/isLogginMiddleware";
import { addMemberToServer } from "../controllers/server/addMemberServer";
import { createChannel } from "../controllers/server/createChannel";
import { deleteChannel } from "../controllers/server/deleteChannel";
import { deleteServer } from "../controllers/server/deleteServer";
import { getUserServers } from "../controllers/server/getUserServer";
import { removeMemberFromServer } from "../controllers/server/removeMemberFromServer";
import { updateServer } from "../controllers/server/updateServer";
import { createServer } from "../controllers/server/createServer";

const serverRoutes = (app: Router) => {
  const router = Router();

  router.get("/user/:userId", getUserServers);
  router.get("/:serverId", [checkAuth]);
  router.post("/", createServer);
  router.put("/:serverId", updateServer);
  router.delete("/:serverId", deleteServer);

  router.post("/members", addMemberToServer);
  router.delete("/members/:serverId/:userId", removeMemberFromServer);

  router.post("/channels", createChannel);
  router.delete("/channels/:channelId", deleteChannel);

  app.use("/servers", [checkAuth], router);
};

export default serverRoutes;
