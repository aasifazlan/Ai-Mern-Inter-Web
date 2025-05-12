// server/routes/aiRoutes.js
import express from "express";
import { getInterviewQA } from "../controllers/aiController.js";

const router = express.Router();
router.post("/generate", getInterviewQA);

export default router;
