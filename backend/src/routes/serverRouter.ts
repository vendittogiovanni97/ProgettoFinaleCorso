import { Router } from "express";
import { checkAuth } from "../middleware/isLogginMiddleware";
import {
  getUserServers,
  getServerDetails,
  updateServer,
  deleteServer,
  addMemberToServer,
  removeMemberFromServer,
  createChannel,
  deleteChannel,
  createServer,
} from "../controllers/server/controller";

const serverRoutes = (app: Router) => {
  const router = Router();

  router.get("/user/:userId", [checkAuth], getUserServers);
  router.get("/:serverId", [checkAuth], getServerDetails);
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
