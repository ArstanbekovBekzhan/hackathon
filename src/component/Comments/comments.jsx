import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './comment.module.css'
const Comment = ({ cardId }) => {
    const [commentIds, setCommentIds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(cardId);
        const fetchCommentIds = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/cards/${cardId}`);
                const commentData = response.data.comments;
                setCommentIds(commentData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching comment IDs:', error);
                setLoading(false);
            }
        };

        fetchCommentIds();
    }, [cardId]);

    if (loading) {
        return <div>Loading comment IDs...</div>;
    }

    return (
        <div className={styles.commentsContainer}>
            {commentIds.map(comments => (
                <div key={comments.id} className={styles.commentItem}>
                    <h2 className={styles.userName}>{comments.user_name}</h2>
                    <p className={styles.commentText}>{comments.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default Comment;
