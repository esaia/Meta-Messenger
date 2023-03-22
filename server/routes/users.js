import express from "express";
import {
  addMessage,
  addUserToConversation,
  getAllUser,
  getUserChats,
} from "../controllers/users.js";
import { verify } from "./auth.js";

const router = express.Router();

router.route("/all").get(getAllUser);
router
  .route("/userconversations")
  .get(verify, getUserChats)
  .post(verify, addUserToConversation);

router.route("/addmessage").post(verify, addMessage);

export default router;
