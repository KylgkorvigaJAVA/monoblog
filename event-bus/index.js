const { default: axios } = require('axios');
const express = require('express');

const POSTS_URL = process.env.POSTS_URL || 'http://localhost:5000';
const COMMENTS_URL = process.env.COMMENTS_URL || 'http://localhost:5001';
const QUERY_URL = process.env.QUERY_URL || 'http://localhost:5002';
const MODERATION_URL = process.env.MODERATION_URL || 'http://localhost:5003';

const app = express();
app.use(express.json());

app.post('/events', (req, res) => {
    const event = req.body;
    console.log('Received Event:', event.type);

    axios.post(`${POSTS_URL}/events`, event).catch((err) => {
        console.error('Error forwarding event to posts service:', err.message);
    });

    axios.post(`${COMMENTS_URL}/events`, event).catch((err) => {
        console.error('Error forwarding event to comments service:', err.message);
    });

    axios.post(`${QUERY_URL}/events`, event).catch((err) => {
        console.error('Error forwarding event to query service:', err.message);
    });

    axios.post(`${MODERATION_URL}/events`, event).catch((err) => {
        console.error('Error forwarding event to moderation service:', err.message);
    });

    res.json({ status: 'OK' });
});

app.listen(5005, () => {   
    console.log('Event bus listening on port 5005');
});
