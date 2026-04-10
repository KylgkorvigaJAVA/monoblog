const express = require('express');
const axios = require('axios');

const EVENT_BUS_URL = process.env.EVENT_BUS_URL || 'http://localhost:5005';

const app = express();
app.use(express.json());

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    // Only process CommentCreated events
    if (type === 'CommentCreated') {
        // Check if comment contains the word "orange"
        const containsOrange = data.content.toLowerCase().includes('orange');
        
        const status = containsOrange ? 'rejected' : 'approved';

        console.log(`Moderating comment ${data.id}: status = ${status}`);

        // Send CommentModerated event back to event bus
        axios.post(`${EVENT_BUS_URL}/events`, {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status: status
            }
        }).catch((err) => {
            console.error('Error emitting CommentModerated event:', err.message);
        });
    }

    res.json({ status: 'OK' });
});

app.listen(5003, () => {
    console.log('Moderation service listening on port 5003');
});
