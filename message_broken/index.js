import express from 'express';
import http from 'http';
import axios from 'axios'
import cors from 'cors'; // Importing the cors module

// Importing the express module

const app = express();
const server = http.createServer(app);
const PORT = 8005;

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/events', async(req, res) => {

    const event = req.body;

    console.log('Event received:', event);

    await axios.post('http://localhost:8000/events', event); // Send event to Snippet service
    await axios.post('http://localhost:8001/events', event); // Send event to Comment service
    await axios.post('http://localhost:8002/events', event); // Send event to query service
    
   return res.status(200).send({ status: 'OK' });
});


server.listen(PORT, () => {
    console.log(`0 Server running at http://localhost:${PORT}`);
});