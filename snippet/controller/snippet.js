import {snippets} from '../database/index.js'
import crypto from 'crypto';

export const createSnippet = async (req, res) => {
    const { title, snippetCode } = req.body;
    try {
        const snippetId = crypto.randomBytes(4).toString('hex');
        if (!title || !snippetCode) {
            return res.status(400).json({ message: 'Title and code are required' });
        }

        if (snippets[snippetId]) {
            return res.status(409).json({ message: 'Snippet ID already exists' });
        }

        const createAt = new Date().toISOString();

        snippets[snippetId] ={
            id: snippetId,
            title: title,
            code: snippetCode,
            createdAt: createAt,
        }

        res.status(201).json({
            message: 'Snippet created successfully',
            success: true,
            snippet: snippets[snippetId],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};