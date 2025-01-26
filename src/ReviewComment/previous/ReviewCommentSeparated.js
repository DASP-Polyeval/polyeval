import React, { useState } from "react";
import TaskTable from "../TaskTable";
import FeedbackForm from "./FeedbackForm";
import CommentSection from "./CommentSection";
import ImportExport from "./ImportExport";

const ReviewCommentS = () => {
  const sampleTasks = [
    {
      taskId: 1,
      task: "Translation",
      input: "Hola, ¿cómo estás?",
      output: "Hello, how are you?",
    },
    {
      taskId: 2,
      task: "Translation",
      input: "Je m'appelle Pierre.",
      output: "My name is Pierre.",
    },
    {
      taskId: 3,
      task: "Summarization",
      input: "The sun rises in the east and sets in the west.",
      output: "The sun rises in the east.",
    },
    {
      taskId: 4,
      task: "Summarization",
      input: "This document describes the steps to build a treehouse.",
      output: "How to build a treehouse.",
    },
  ];

  const translationQuestions = [
    "Are there specific phrases that seem mistranslated?",
    "Did the translation omit any important details?",
  ];

  const summarizationQuestions = [
    "Does the summary capture the main points?",
    "Is there redundant information?",
  ];

  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [freeFormComment, setFreeFormComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showColumns, setShowColumns] = useState(true);

  const handleSaveComment = () => {
    if (!selectedTask) {
      alert("Please select a task to comment on.");
      return;
    }

    const timestamp = new Date().toLocaleString();
    const newComment = {
      task: selectedTask.task,
      input: selectedTask.input,
      output: selectedTask.output,
      username: "User1",
      timestamp,
      comment: selectedQuestion
        ? `${selectedQuestion}${freeFormComment ? ` - ${freeFormComment}` : ""}`
        : freeFormComment,
    };

    setComments([...comments, newComment]);
    setFreeFormComment("");
    setSelectedQuestion("");
    alert("Comment saved successfully!");
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedComments = JSON.parse(event.target.result);
        setComments(importedComments);
        alert("Comments imported successfully!");
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <TaskTable
        tasks={sampleTasks}
        onComment={setSelectedTask}
        showColumns={showColumns}
        toggleColumns={() => setShowColumns(!showColumns)}
      />

      {selectedTask && (
        <FeedbackForm
          task={selectedTask}
          translationQuestions={translationQuestions}
          summarizationQuestions={summarizationQuestions}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
          freeFormComment={freeFormComment}
          setFreeFormComment={setFreeFormComment}
          onSaveComment={handleSaveComment}
        />
      )}

      <h2>Feedback Section</h2>
      <CommentSection
        comments={comments}
        onDelete={(index) =>
          setComments(comments.filter((_, i) => i !== index))
        }
      />

      <h2>Import/Export Comments</h2>
      <ImportExport comments={comments} onImport={handleImport} />
    </div>
  );
};

export default ReviewCommentS;
