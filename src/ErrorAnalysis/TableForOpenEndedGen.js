import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { Box,Button } from "@mui/material";
import TranslateButton from "./TranslateButton";

import Rating from "../Components/Rating/Rating";
import FeedbackForm from "../ReviewComment/FeedbackForm";
import CommentSection from "../ReviewComment/CommentSection";
import ImportExport from "../ReviewComment/ImportExport";

const errorAnalysisColumns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "input", label: "Input Text", minWidth: 170 },
  {
    id: "target",
    label: "Target",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "output",
    label: "Output",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const humanEvaluationColumns = errorAnalysisColumns.concat([
  
  { id: "rating", label: "Rating", minWidth: 170 },
  { id: "comment", label: "Action", minWidth: 170, align: "left" },
]);

function createData(id, input, target, output) {
  return { id, input, target, output };
}

const rows = [
  createData(
    1,
    " مڠومڤول ايبو؟",
    "١. اڤي - اكو بوليه ممبواڠ اڤي جك اي اد (تتاڤي بياساڽ ستله دڤاوتوم) ٢. دڤاودڠ اونتوق دڤاودڠ 3. دڤيڠڬيل دان دڤيڠڬيل اونتوق دڤاچيت (ڤيڠڬيل ايڤل كريڤ سياڤاڤا؟) ٤. دڤاچيت جادي سوس سيب ٥. جيه كاندوڠن دڠن ڬلاسي مالم",
    "\n\n\nاڤاكه 5 چارا اونتوق مڠومڤول ايبو؟\n\n\nاڤاكه 5 چارا اونتوق مڠومڤول ايبو؟\n\n\nاڤاكه 5 چارا اونتوق مڠومڤول ايبو؟\n\n\nاڤاكه 5 چارا اونتوق مڠومڤول ايبو؟\n\n\nاڤاكه 5 چارا اونتوق مڠومڤول ايبو؟\n\n\nاڤاكه 5 چارا اونتوق مڠومڤول ايبو؟\n\n\nاڤاكه 5 چارا"
  ),
];

//TO DO: Add OpenEnded Questions 
const OpenEndedQuestions = [
  '...',
  '...',
];

export default function TableForOpenEndedGen() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRow, setSelectedRow] = useState(null); // Selected row state
  const [showColumns, setShowColumns] = useState(false); // true: Human Evaluation, false: Error Analysis, false: 
  const [freeFormComment, setFreeFormComment] = useState('');
  const [comments, setComments] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState('');


  const toggleColumns = () => setShowColumns(!showColumns);

  const handleSaveComment = () => {
    if (!selectedRow) {
      alert('Please select a task to comment on.');
      return;
    }

    const timestamp = new Date().toLocaleString();
    const newComment = {
      task: selectedRow.id,
      input: selectedRow.text,
      output: selectedRow.hypText,
      username: 'User1',
      timestamp,
      comment: selectedQuestion
        ? `${selectedQuestion}${freeFormComment ? ` - ${freeFormComment}` : ''}`
        : freeFormComment,
    };

    setComments([...comments, newComment]);
    setFreeFormComment('');
    alert('Comment saved successfully!');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedComments = JSON.parse(event.target.result);
        setComments(importedComments);
        alert('Comments imported successfully!');
      } catch {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleComment = (task) => {
    alert(`Commenting on: ${task.text}`);
  };

  const columns = showColumns ? humanEvaluationColumns: errorAnalysisColumns ;

  return (
    <>
    <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={toggleColumns} variant="contained">
            {showColumns ? "Error Analysis Mode" : "Human Evaluation Mode"}
          </Button>
    </Box>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{ fontWeight: "bold" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      //activate selected row
                      onClick={() => handleRowClick(row)}
                      selected={selectedRow === row}
                      sx={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedRow === row ? "lightblue" : "white",
                      }}
                    >
                      {/* According to the mode show columns */}
                      {columns.map((column) => {
                      if (column.id === "rating" && showColumns) {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Rating />
                          </TableCell>
                        );
                      }
                      if (column.id === "comment" && showColumns) {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Button
                              onClick={() => handleComment(row)}
                              variant="outlined"
                            >
                              Comment
                            </Button>
                          </TableCell>
                        );
                      }
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value || "N/A"}
                        </TableCell>
                      );
                    })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* TranslateButton */}
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <TranslateButton selectedRow={selectedRow} />
        </Box>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {showColumns && selectedRow && (
        <FeedbackForm
          task={selectedRow}
          Questions={OpenEndedQuestions}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
          freeFormComment={freeFormComment}
          setFreeFormComment={setFreeFormComment}
          onSaveComment={handleSaveComment}
        />
      )}
    {showColumns &&
    (<>
      <h2>Feedback Section</h2>
      <CommentSection comments={comments} onDelete={(index) => setComments(comments.filter((_, i) => i !== index))} />

      <h2>Import/Export Comments</h2>
      <ImportExport comments={comments} onImport={handleImport} />
      </>
    )}
    </>
  );
}
