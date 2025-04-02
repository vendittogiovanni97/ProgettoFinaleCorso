import { Router } from "express";
import { checkAuth } from "../middleware/isLogginMiddleware";
import { acceptFriendRequest } from "../controllers/friendship/acceptRequest";
import { blockUser } from "../controllers/friendship/blockUser";
import { getFriends } from "../controllers/friendship/getFriends";
import { getPendingRequests } from "../controllers/friendship/getPendingRequest";
import { sendFriendRequest } from "../controllers/friendship/sendFriendRequest";

const friendRoutes = (app: Router) => {
  const router = Router();

  router.get("/:userId", [checkAuth], getFriends);
  router.get("/pending/:userId", [checkAuth], getPendingRequests);
  router.post("/request", [checkAuth], sendFriendRequest);
  router.put("/accept/:requestId", [checkAuth], acceptFriendRequest);
  router.delete("/:requestId", [checkAuth]);
  router.post("/block", [checkAuth], blockUser);

  app.use("/friends", router);
};

export default friendRoutes;
