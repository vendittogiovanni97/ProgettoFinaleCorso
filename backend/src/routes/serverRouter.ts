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

  router.get("/user/:userId", [checkAuth], getUserServers);
  router.get("/:serverId", [checkAuth]);
  router.post("/", [checkAuth], createServer);
  router.put("/:serverId", [checkAuth], updateServer);
  router.delete("/:serverId", [checkAuth], deleteServer);

  router.post("/members", [checkAuth], addMemberToServer);
  router.delete(
    "/members/:serverId/:userId",
    [checkAuth],
    removeMemberFromServer
  );

  router.post("/channels", [checkAuth], createChannel);
  router.delete("/channels/:channelId", [checkAuth], deleteChannel);

  app.use("/servers", router);
};

export default serverRoutes;
