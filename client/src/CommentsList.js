const CommentsList = ({ comments }) => {
    const renderedComments = comments.map((comment) => {
        return <li key={comment.id}>{comment.content}</li>;
    });

    return (
        <ul>
            {renderedComments}
        </ul>
    );
}

// import React, {useEffect, useState} from 'react';
// import axios from 'axios';

// const CommentsList = ({ postid, commentsMap }) => {
//     const [comments, setComments] = useState([]);
    
//     useEffect(() => {
//         const fetchComments = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:5000/posts/${postid}/comments`);
//                 setComments(res.data);
//             } catch (err) {
//                 console.error(err);
//             }
//         };
//         fetchComments();
//     }, [postid]);

//     const allComments = [...comments, ...(commentsMap[postid] || [])];

//     const renderedComments = allComments.map((comment) => {
//         return <li key={comment.id}>{comment.content}</li>;
//     });

//     return (
//         <ul>
//             {renderedComments}
//         </ul>
//     );
// }

export default CommentsList;