import express from 'express';
import http from 'http';
import axios from 'axios'
import cors from 'cors'; // Importing the cors module

// Importing the express module

const app = express();
const server = http.createServer(app);
const PORT = 8002;

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const snippets = {};


app.get('/snippets', (req, res) => {
    res.status(200).json({
        message: 'Snippets retrieved successfully',
        success: true,
        snippets: snippets,
    });
});


app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log('Event received:', type, data);

    if (type === 'SnippetCreated') {
        try {
            const { id, title, code, createdAt } = data;
            snippets[id] = {
                id,
                title,
                code,
                createdAt,
                comments: [],
            }
        } catch (error) {
            console.error('Error forwarding event to snippet service:', error.message);
        }
    }else if (type === 'CommentCreated') {
        try {
            const { id, snippetId, content, createdAt } = data;
                snippets[snippetId].comments.push({
                    id,
                    content,
                    createdAt,
                });
        } catch (error) {
            console.error('Error forwarding event to snippet service:', error.message);
        }
    }

    res.status(200).json({ message: 'Event received' });
});



server.listen(PORT, () => {
    console.log(`3 Server running at http://localhost:${PORT}`);
});