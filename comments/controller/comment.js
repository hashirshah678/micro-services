import crypto from 'crypto'
import { comments as commentDB } from '../database/index.js';

import axios from 'axios'

export const commentCreate = async (req, res) => {
    const { id: snippetId } = req.params
    const { text } = req.body
    const commentId = crypto.randomBytes(4).toString('hex')
    const createdAt = new Date().toISOString()

    try {
        const comments = commentDB[snippetId] || [];

        comments.push({
            id: commentId,
            text,
            createdAt
        })

        commentDB[snippetId] = comments

        // Publish the event

        axios.post('http://localhost:8005/events', {
            type: 'CommentCreated',
            data: {
                id: commentId,
                snippetId,
                content: text,
                createdAt
            }
        }).then((response) => {
            console.log('Event published successfully:', response.data);
        }).catch((error) => {
            console.error('Error publishing event:', error.message);
        });



        return res.status(201).json({
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
        return res.status(500).json({ error: 'Internal server error' })
    }
};