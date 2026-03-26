const express = require('express');
const { randomBytes } = require('node:crypto');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));

const posts = [];

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const title = req.body.title;
    const post = {
        id: id,
        title
    };
    posts.push(post);

    axios.post('http://localhost:5005/events', {
        type: 'PostCreated',
        data: post
    }).catch((err) => {
        console.error('Error sending event to event bus:', err.message);
    });

    res.status(201).json({
        post: post
    });
});

app.post('/events', (req, res) => {
    // console.log('Received Event:', req.body);
    res.json({ });
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
    // 
    
    axios.post('http://localhost:5005/events', {
        type: 'CommentCreated',
        data: {
            id: comment.id,
            content: comment.content,
            postId: comment.postId
        }
    }).catch((err) => {
        console.error('Error emitting event:', err.message);
    });
    // 
    res.status(201).json(comment);
});

app.listen(5000, () => {
    console.log('Posts service listening on port 5000');
});
