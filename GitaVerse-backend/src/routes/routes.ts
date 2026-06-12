import express from "express";
import { randomShlokaController } from "../controllers/shlokaController";
import { chatBotController } from "../controllers/chatBotController";
const router = express.Router();

router.get("/api/v1/random-shloka", randomShlokaController);
router.post("/api/v1/ask", chatBotController)

module.exports = router;