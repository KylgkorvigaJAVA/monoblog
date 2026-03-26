const express = require('express');
const { randomBytes } = require('node:crypto');
const axios = require('axios');
/* const cors = require('cors'); */

const app = express();
app.use(express.json());
/* app.use(cors({origin: 'http://localhost:3000'})); */

const posts = [];

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/posts', (req, res) => {
    const title = req.body.title;
    const post = {
        id: randomBytes(4).toString('hex'),
        title
    };
    posts.push(post);
    res.status(201).json({
        post: post
    });
});

const postComments = [];

app.get('/posts/:id/comments', (req, res) => {
    res.json(postComments.filter(comment => comment.postId === req.params.id));
});

app.post('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    const content = req.body.content;
    const comment = {
        id: randomBytes(4).toString('hex'),
        postId,
        content
    };
    postComments.push(comment);
    console.log('Comment created:', comment);
    
    console.log('Sending CommentCreated event to eventbus...');
    axios.post('http://localhost:5005/events', {
        type: 'CommentCreated',
        data: {
            id: comment.id,
            content: comment.content,
            postId: comment.postId
        }
    }).then(() => {
        console.log('Event sent successfully');
    }).catch((err) => {
        console.error('Error emitting event:', err.message);
    });
    
    res.status(201).json(comment);
});

app.post('/events', (req, res) => {
    console.log('Received Event:', req.body);
    res.json({ });
});

app.listen(5001, () => {
    console.log('Comments service listening on port 5001');
});
