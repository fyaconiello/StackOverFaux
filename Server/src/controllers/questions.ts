// controllers/questionsController.js
import {
    Request,
    Response
} from "express";
import logger from "../logger";
import Question from "../models/Question";
import User from "../models/User";

class QuestionController {
    // Get all questions supports pagination
    async getQuestions(req: Request, res: Response) {
        try {
            // @ts-ignore this is set in custom pagination middleware.
            const {limit, offset} = req;
            console.log("limit/offset", [limit, offset]);
            const questions: Question[] = await Question.findAll({
                limit: limit,
                offset: offset
            });

            const total :number = await Question.count();

            res.json({
                'data': questions,
                'num_records': questions.length as number,
                'total_records': total as number
            });
        } catch (error) {
            logger.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    // Get a single question by ID
    async getQuestionById(req: Request, res: Response) {
        const {id} = req.params;

        try {
            const question: Question | null = await Question.findByPk(id);

            if (!question) {
                return res.status(404).json({error: 'Question not found'});
            }

            res.json(question);
        } catch (error) {
            logger.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    // Get questions (paginated) by User Id
    async getQuestionByUserId(req: Request, res: Response) {
        try {
            const {user_id} = req.params;
            // @ts-ignore this is set in custom pagination middleware.
            const {limit, offset} = req;

            // Check if the user exists
            const user: User | null = await User.findByPk(user_id);

            if (!user) {
                return res.status(404).json({error: 'User not found'});
            }

            const questions: Question[] = await Question.findAll({
                where: {user_id: user.id},
                limit: limit,
                offset: offset
            });

            res.json(questions);
        } catch (error) {
            logger.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    // Create a new question
    async createQuestion(req: Request, res: Response) {
        const {body, userId} = req.body;

        try {
            // Check if the user exists
            const user: User | null = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({error: 'User not found'});
            }

            const question: Question = await Question.create({
                body,
                userId,
            });

            res.json(question);
        } catch (error) {
            logger.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    // Update a question by ID
    async updateQuestion(req: Request, res: Response) {
        const {id} = req.params;
        const {body} = req.body;

        try {
            const question = await Question.findByPk(id);

            if (!question) {
                return res.status(404).json({error: 'Question not found'});
            }

            question.body = body;
            await question.save();

            res.json(question);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    // Delete a question by ID
    async deleteQuestion(req: Request, res: Response) {
        const {id} = req.params;

        try {
            const question = await Question.findByPk(id);

            if (!question) {
                return res.status(404).json({error: 'Question not found'});
            }

            await question.destroy();

            res.json({message: 'Question deleted successfully'});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
}

export default new QuestionController();