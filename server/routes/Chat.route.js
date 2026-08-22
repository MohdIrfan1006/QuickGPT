import express from "express";
import {
  createChat,
  deleteChat,
  getChats,
} from "../controllers/Chat.controller.js";
import { protect } from "../middlewares/auth.js";

const chatRouter = express.Router();

chatRouter.post("/create", protect, createChat); // POST method (Fixed)
chatRouter.get("/get", protect, getChats);
chatRouter.post("/delete", protect, deleteChat);

export default chatRouter;
