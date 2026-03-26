import { useEffect, useState } from "react";
import axios from "axios";
import CommentsList from "./CommentsList";
import CommentCreate from "./CommentCreate";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    // const [commentsMap, setCommentsMap] = useState({});

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("http://localhost:5002/posts");
                const posts = res.data;
                setPosts(posts);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPosts();
    }, []);

    // const onCommentAdded = (postId, newComment) => {
    //     setCommentsMap(prev => ({
    //         ...prev,
    //         [postId]: [...(prev[postId] || []), newComment]
    //     }));
    // };

    console.log(posts);

    const postsForRender = Object.values(posts).map(post => (
        <div className="card" style={{ width: '30%', marginBottom: '20px'}} key={post.id}>
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentsList comments={post.comments} />
                <CommentCreate postid={post.id}/>
            </div>
        </div>
    ));

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {postsForRender}
        </div>
    );
}

export default PostList;