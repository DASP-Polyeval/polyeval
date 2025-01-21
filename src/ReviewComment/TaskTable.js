import React from "react";
import Rating from "../Components/Rating/Rating";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const TaskTable = ({ tasks, onComment, showColumns, toggleColumns }) => (
  <div>

    <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
      <Button onClick={toggleColumns} variant="contained">
        {showColumns ? "Error Analysis Mode" : "Human Evaluation Mode"}
      </Button>
    </Box>

    <table
      style={{
        borderCollapse: "collapse",
        width: "100%",
        marginBottom: "20px",
      }}
    >
      <thead>
        <tr>
          <th style={{ border: "1px solid black", padding: "8px" }}>TaskID</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>Task</th>

          <th style={{ border: "1px solid black", padding: "8px" }}>Input</th>

          <th style={{ border: "1px solid black", padding: "8px" }}>Output</th>

          {showColumns && (
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Rating
            </th>
          )}

          {showColumns && (
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Action
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.taskId}>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {task.taskId}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {task.task}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {task.input}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {task.output}
            </td>
            {showColumns && (
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <td>{<Rating />}</td>
              </td>
            )}
            {showColumns && (
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <button onClick={() => onComment(task)}>Comment</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TaskTable;
