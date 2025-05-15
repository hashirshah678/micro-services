import { snippets } from '../database/index.js'
import crypto from 'crypto';
import axios from 'axios'

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

        snippets[snippetId] = {
            id: snippetId,
            title: title,
            code: snippetCode,
            createdAt: createAt,
        }
        try {
            
            // Best Place to Publish the event
            axios.post('http://localhost:8005/events', {
                type: 'SnippetCreated',
                data: {
                    id: snippetId,
                    title: title,
                    code: snippetCode,
                    createdAt: createAt,
                }
            }).then((response) => {
                console.log('Event published successfully:', response.data);
            }).catch((error) => {
                console.error('Error publishing event:', error.message);
            });
        } catch (error) {
            console.error('Error publishing event:', error.message);
            return res.status(500).json({ message: 'Failed to publish event' });
        }



        return res.status(201).json({
            message: 'Snippet created successfully',
            success: true,
            snippet: snippets[snippetId],
        });
    } catch (error) {
        console.error(error?.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};