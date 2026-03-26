import axios from "axios";
import { useState } from "react";

// const CommentCreate = ({ postid, onCommentAdded }) => {
const CommentCreate = ({ postid }) => {
    const [content, setContent] = useState("");

    const onChange = (event) => {
        setContent(event.target.value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const res = await axios.post(`http://localhost:5000/posts/${postid}/comments`, {content});
        // onCommentAdded(postid, res.data);
        setContent("");
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input value={content} onChange={onChange} className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default CommentCreate;