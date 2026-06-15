import express from "express";
import { randomShlokaController } from "../controllers/shlokaController";
import { chatBotController } from "../controllers/chatBotController";
const router = express.Router();

router.get("/api/v1/daily-shloka", randomShlokaController);
router.post("/api/v1/chatbot", chatBotController)

module.exports = router;