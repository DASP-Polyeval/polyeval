import React from 'react';

const FeedbackForm = ({
  task,
  Questions,
  selectedQuestion,
  setSelectedQuestion,
  freeFormComment,
  setFreeFormComment,
  onSaveComment,
}) => {
  const questions = Questions;

  return (
    <div>
      <h3>Provide Feedback for Task</h3>
      <div
        style={{
          marginBottom: '10px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#f1f1f1',
        }}
      >
        <p><strong>Task:</strong> {task.task}</p>
        <p><strong>Input:</strong> {task.input}</p>
        <p><strong>Output:</strong> {task.output}</p>
      </div>

      {questions.map((q, i) => (
        <div key={i}>
          <label>
            <input
              type="radio"
              value={q}
              checked={selectedQuestion === q}
              onChange={() => setSelectedQuestion(q)}
            />
            {q}
          </label>
        </div>
      ))}
      <div>
        <label>
          <input
            type="radio"
            value="Free Form Comment"
            checked={selectedQuestion === 'Free Form Comment'}
            onChange={() => setSelectedQuestion('Free Form Comment')}
          />
          Free Form Comment
        </label>
      </div>
      <textarea
        value={freeFormComment}
        onChange={(e) => setFreeFormComment(e.target.value)}
        placeholder="Enter free-form feedback here..."
        rows="5"
        cols="50"
        style={{ width: '100%', marginTop: '10px' }}
      />
      <br />
      <button onClick={onSaveComment} style={{ marginTop: '10px' }}>
        Save Comment
      </button>
    </div>
  );
};

export default FeedbackForm;