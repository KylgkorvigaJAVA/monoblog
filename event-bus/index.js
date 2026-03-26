const { default: axios } = require('axios');
const express = require('express');

const app = express();
app.use(express.json());

app.post('/events', (req, res) => {
    const event = req.body;
    console.log('Received Event:', event.type);

    axios.post('http://localhost:5000/events', event).catch((err) => {
        console.error('Error forwarding event to posts service:', err.message);
    });

    axios.post('http://localhost:5001/events', event).catch((err) => {
        console.error('Error forwarding event to comments service:', err.message);
    });

    axios.post('http://localhost:5002/events', event).catch((err) => {
        console.error('Error forwarding event to query service:', err.message);
    });

    res.json({ status: 'OK' });
});

app.listen(5005, () => {   
    console.log('Event bus listening on port 5005');
});
