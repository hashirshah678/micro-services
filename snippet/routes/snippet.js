import express from 'express';

import { createSnippet } from '../controller/snippet.js';
import { fetchSnippet } from '../controller/get-snippets.js';

const router = express.Router();

router.get('/', fetchSnippet);
router.post('/', createSnippet);

export default router;
