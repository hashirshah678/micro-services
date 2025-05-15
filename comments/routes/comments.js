import express from 'express';
import { commentCreate } from '../controller/comment.js';
import { getAllCommentsBySinppetId } from '../controller/get-all-comments.js';

const router = express.Router();

router.get('/:id/comment', getAllCommentsBySinppetId)
router.post('/:id/comment', commentCreate)

export default router;