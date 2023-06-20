import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './comment.module.css';

const Comment = ({ cardId }) => {
  const [commentIds, setCommentIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
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

  useEffect(() => {
    const storedUserName = localStorage.getItem('Username');
    setUserName(storedUserName || '');
  }, []);

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await addComment(cardId, userName, newComment);
      setNewComment('');

      const response = await axios.get(`http://localhost:3000/cards/${cardId}`);
      const commentData = response.data.comments;
      setCommentIds(commentData);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const addComment = async (cardId, userName, commentText) => {
    try {
      const response = await axios.post(`http://localhost:3000/cards/${cardId}`, {
        user_name: userName,
        comment: commentText,
      });
      console.log('Комментарий успешно добавлен:', response.data);
      // Дополнительные действия после успешного добавления комментария
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
      // Обработка ошибки при добавлении комментария
    }
  };

  if (loading) {
    return <div>Loading comment IDs...</div>;
  }

  return (
    <div className={styles.commentsContainer}>
      {commentIds.map((comment) => (
        <div key={comment.id} className={styles.commentItem}>
          <h2 className={styles.userName}>{comment.user_name}</h2>
          <p className={styles.commentText}>{comment.comment}</p>
        </div>
      ))}
      <div className={styles.commentForm}>
        <input
          type="text"
          value={newComment}
          onChange={handleChange}
          className={styles.commentInput}
          placeholder="Напишите комментарий..."
        />
        <button onClick={handleSubmit} className={styles.commentButton}>
          Оставить комментарий
        </button>
      </div>
    </div>
  );
};

export default Comment;
