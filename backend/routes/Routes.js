import express from "express";
import {
  getAllQuestions,
  getAnsweredQuestions,
  getCurrentQuestion,
  getQuestionById,
  // resetAnsweredQuestions,
  resetQuiz,
  updateAnsweredQuestions,
} from "../controllers/QuizController.js";
import {
  getProfiles,
  updateScore,
} from "../controllers/ScoreController.js";
import { IP } from "../utils/IP.js";

const router = express.Router();

router.get("/questions", getAllQuestions);
router.get("/questions/:qid", getQuestionById);
router.get("/answered", getAnsweredQuestions);
router.post("/answered", updateAnsweredQuestions);
// router.delete("/answered/reset", resetAnsweredQuestions);
router.get("/ip", IP);
router.get("/profiles", getProfiles);
router.post("/score", updateScore);
router.get("/currentQuestion", getCurrentQuestion);
router.get("/reset", resetQuiz)

export default router;
