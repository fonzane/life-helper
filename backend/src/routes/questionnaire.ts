import express from 'express';
const router = express.Router();
import QuestionnaireModel, { Questionnaire } from '../models/Questionnaire';

// router.get(
//     '/questionnaires'

// )

router.post(
    '/questionnaire',
    async (req: express.Request, res: express.Response) => {
        const newQuestionnaire = await QuestionnaireModel.create(req.body);
        console.log(newQuestionnaire);
        res.json(newQuestionnaire);
    }
)

export default router;