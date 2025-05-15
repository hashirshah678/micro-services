import express from 'express';
import http from 'http';
import router from './routes/comments.js';
import cors from 'cors'


const app = express();
const server = http.createServer(app);
const PORT = 8001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/snippet', router);


app.post('/events', async (req, res) => {
    const event = req.body;

    console.log('Event received:', event);
    return res.status(200).json({ success: true });
});

app.get('/', (req, res) => {
    res.send('Hello from Comment Express server!');
});


server.listen(PORT, () => {
    console.log(`2 Server running at http://localhost:${PORT}`);
});