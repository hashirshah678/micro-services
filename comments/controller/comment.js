import crypto from 'crypto'
import { comments as commentDB } from '../database/index.js';

export const commentCreate = async (req, res) => {
    const { id: snippetId } = req.params
    const { text } = req.body
    const commentId = crypto.randomBytes(4).toString('hex')
    const createdAt = new Date().toISOString()

    try {
        const comments =  commentDB[snippetId] || [];

        comments.push({
            id: commentId,
            text,
            createdAt
        })

        commentDB[snippetId] = comments
    
        res.status(201).json({
            message: 'Comment created successfully',
            success: true,
            comment: {
                id: commentId,
                text,
                createdAt
            }
        })
        
    } catch (error) {
        console.error('Error creating comment:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
};