import express from 'express';
import http from 'http';
import router from './routes/snippet.js';

import cors from 'cors'; // Importing the cors module

// Importing the express module

const app = express();
const server = http.createServer(app);
const PORT = 8000;

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/snippet',router);


app.get('/', (req, res) => {
    res.send('Hello from Snippet Express server!');
});


server.listen(PORT, () => {
    console.log(`1 Server running at http://localhost:${PORT}`);
});