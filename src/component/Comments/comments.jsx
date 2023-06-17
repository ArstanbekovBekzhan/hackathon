import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      {commentIds.map(comments => (
        <div key={comments.id}>
            <h1>Коментарий</h1>
            <h2>{comments.user_name}</h2>
          <p>{comments.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Comment;
