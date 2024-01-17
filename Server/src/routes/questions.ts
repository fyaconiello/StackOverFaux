// routes/userRoutes.js
import express, {Router} from "express";
import QuestionController from "../controllers/questions";

const router :Router = express.Router();

router.get('/', QuestionController.getQuestions);
router.get('/:id', QuestionController.getQuestionById);
router.get('/user/:user_id', QuestionController.getQuestionByUserId);
router.post('/', QuestionController.createQuestion);
router.put('/:id', QuestionController.updateQuestion);
router.delete('/:id', QuestionController.deleteQuestion);

export default router;