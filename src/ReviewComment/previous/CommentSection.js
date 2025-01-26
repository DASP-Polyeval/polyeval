import React from 'react';

const CommentSection = ({ comments, onDelete }) => (
  <div>
    {comments.map((comment, index) => (
      <div
        key={index}
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <p><strong>Username:</strong> {comment.username}</p>
        <p><strong>Timestamp:</strong> {comment.timestamp}</p>
        <p><strong>Task:</strong> {comment.task}</p>
        <p><strong>Input:</strong> {comment.input}</p>
        <p><strong>Output:</strong> {comment.output}</p>
        <p><strong>Comment:</strong> {comment.comment}</p>
        <button onClick={() => onDelete(index)}>Delete</button>
      </div>
    ))}
  </div>
);

export default CommentSection;