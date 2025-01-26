import React, { useState, useEffect } from "react";
import { Box, Drawer, Typography, TextField, Button } from "@mui/material";

import Rating from "../Components/Rating/Rating";

const CommentSidebar = ({ isOpen, onClose, selectedRow, onSubmit }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (selectedRow) {
      switch (selectedRow.task_type) {
        case "classification":
          setInput(selectedRow?.Prompt || "No data");
          setOutput(selectedRow?.Predicted_Category || "No data");
          break;
        case "generation":
          setInput(selectedRow?.Prompt || "No data");
          setOutput(selectedRow?.Generated_Text || "No data");
          break;
        case "translation":
          setInput(selectedRow?.Source_Text || "No data");
          setOutput(selectedRow?.Translated_Text || "No data");
          break;
        case "summarization":
          setInput(selectedRow?.Document || "No data");
          setOutput(selectedRow?.Summary || "No data");
          break;
        default:
          setInput("Unknown task type");
          setOutput("Unknown task type");
      }
    }
  }, [selectedRow]);

  const handleSubmit = () => {
    if (!comment.trim()) {
      alert("Please enter a comment.");
      return;
    }

    const feedback = {
      rowId: selectedRow?.ID || "Unknown",
      comment,
      rating,
    };

    onSubmit(feedback);
    setComment(""); // clear comment after submission
    setRating(5); // reset rating after submission
    onClose(); // close the sidebar after submission
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box width={500} padding={2}>
        <Typography variant="h6" gutterBottom>
          Review Row {selectedRow?.ID || "Unknown"}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Input:</strong>
        </Typography>
        {input}

        {/* Output 高亮 */}
        <Typography variant="body1" gutterBottom>
          <strong>Output:</strong>
        </Typography>
        {output}

        <TextField
          label="Comment"
          multiline
          rows={4}
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          margin="normal"
        />
        <Typography variant="body2" gutterBottom>
          <strong>Rating:</strong> {<Rating />}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Drawer>
  );
};

export default CommentSidebar;
