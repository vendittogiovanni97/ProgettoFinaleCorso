import { Router } from "express";
import { checkAuth } from "../middleware/isLogginMiddleware";
import {
  getFriends,
  getPendingRequests,
  sendFriendRequest,
  acceptFriendRequest,
  rejectOrRemoveFriend,
  blockUser,
} from "../controllers/friendship/controller";

const friendRoutes = (app: Router) => {
  const router = Router();

  router.get("/:userId", [checkAuth], getFriends);
  router.get("/pending/:userId", [checkAuth], getPendingRequests);
  router.post("/request", [checkAuth], sendFriendRequest);
  router.put("/accept/:requestId", [checkAuth], acceptFriendRequest);
  router.delete("/:requestId", [checkAuth], rejectOrRemoveFriend);
  router.post("/block", [checkAuth], blockUser);

  app.use("/friends", router);
};

export default friendRoutes;
