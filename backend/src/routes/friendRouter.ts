import { Router } from "express";
import { checkAuth } from "../middleware/isLogginMiddleware";
import { acceptFriendRequest } from "../controllers/friendship/acceptRequest";
import { blockUser } from "../controllers/friendship/blockUser";
import { getFriends } from "../controllers/friendship/getFriends";
import { getPendingRequests } from "../controllers/friendship/getPendingRequest";
import { sendFriendRequest } from "../controllers/friendship/sendFriendRequest";

const friendRoutes = (app: Router) => {
  const router = Router();

  router.get("/:userId", getFriends);
  router.get("/pending/:userId", getPendingRequests);
  router.post("/request", sendFriendRequest);
  router.put("/accept/:requestId", acceptFriendRequest);
  router.delete("/:requestId");
  router.post("/block", blockUser);

  app.use("/friends", [checkAuth], router);
};

export default friendRoutes;
