import express from "express";
import { getmessage, sendmessage } from "../controller/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router=express.Router();

router.get("/:id",protectRoute,getmessage);
router.post("/send/:id",protectRoute,sendmessage);

export default router;