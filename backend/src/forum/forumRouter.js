import express from 'express';
import { getQuestions,createQuestion, postComment, getForumPostByid} from './forumController.js';
import authenticate from '../middlewares/auth.js';
const forumRouter = express.Router();

forumRouter.get('/', authenticate,getQuestions);
forumRouter.post('/', authenticate,createQuestion);
forumRouter.post('/comment/:id', authenticate,postComment);
forumRouter.get('/:id', authenticate,getForumPostByid);

export default forumRouter;