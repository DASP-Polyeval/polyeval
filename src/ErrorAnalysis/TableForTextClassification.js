import * as React from "react";
import { useState } from "react";
import TranslateButton from "./TranslateButton";
import Rating from "../Components/Rating/Rating";
import FeedbackForm from "../ReviewComment/FeedbackForm";
import CommentSection from "../ReviewComment/CommentSection";
import ImportExport from "../ReviewComment/ImportExport";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl, Button } from "@mui/material";
import { Box } from "@mui/material";

const errorAnalysisColumns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "text", label: "Text", minWidth: 170 },
  {
    id: "trueLabel",
    label: "Correct Category", //table head
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "predictedLabel",
    label: "Predicted Category",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "ConfidentScore",
    label: "Confident Score",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

const humanEvaluationColumns = errorAnalysisColumns.concat([
  
  { id: "rating", label: "Rating", minWidth: 170 },
  { id: "comment", label: "Action", minWidth: 170, align: "left" },
]);

function createData(id,text, predictedLabel, trueLabel) {
  const ConfidentScore = null;
  return { id,text, predictedLabel, trueLabel, ConfidentScore };
}

const rows = [
  createData(
    1,
    "Bi Gor nup woŋg giniŋgiy gok, penpen ma aŋgiy, kapkap mindiy, biynimb direp giy, aŋgñirep giniŋgiy. Kuyip timey gey, pen timey ma giniŋgiy.",
    "Sin",
    "Recommendation"
  ),
  createData(
    2,
    "Yenen: Gor biynimb tep nuk gok kuyip kond mindyiŋg, minim apay ak niŋimb ak pen; biynimb timey gipay gok kuyip kirgip aŋgyak.",
    "Violence",
    "Faith"
  ),
  createData(
    3,
    "Pen chin per nimbip Biyomb chin ak wasemb ayip rek niŋiy, Gor nup tep aŋgjun. Nimbip simb niŋiy diniŋg, Kawnan nuk ak yokek, ap nimbip gos ñek mey, nup gosimb niŋiy, biynimb suŋ-tep nuk yimb mindpim. Kun ak, nup aŋgniŋiy, tep aŋgjun.",
    "Description",
    "Faith"
  ),
];

// TO DO: add the classification questions
const classificationQuestions = [
  '...',
  '...',
];

export default function TableForTextClassification() {
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

  const [category, setCategory] = useState(""); // Category filter
  const [label, setLabel] = useState(""); // Label filter

  // Filter rows based on search and category
  const filteredRows = rows.filter((row) => {
    const matchesCategory = category ? row.trueLabel === category : true;
    const matchesLabel = label ? row.predictedLabel === label : true;
    return matchesLabel && matchesCategory;
  });

  const columns = showColumns ? humanEvaluationColumns: errorAnalysisColumns ;
  return (
    <>
    <Box sx={{ p: 0, width: "100%",display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{ p: 2, width: "100%",gap: 5,display: "flex", justifyContent: "flex-start" }}>
          {/* Category Filter */}
          <FormControl
          sx={{ mb: 1, backgroundColor: "#f9f9f9", width: "300px", height: "auto" }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Recommendation">Recommendation</MenuItem>
              <MenuItem value="Faith">Faith</MenuItem>
              <MenuItem value="Sin">Sin</MenuItem>
              <MenuItem value="Description">Description</MenuItem>
              <MenuItem value="Violence">Violence</MenuItem>
              <MenuItem value="Grace">Grace</MenuItem>
            </Select>           
          </FormControl>

          {/* Label Filter */}
          <FormControl 
          sx={{ mb: 1, backgroundColor: "#f9f9f9", width: "300px", height: "auto" }}>
            <InputLabel id="label-select-label">Label</InputLabel>
            <Select
              labelId="label-select-label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Recommendation">Recommendation</MenuItem>
              <MenuItem value="Faith">Faith</MenuItem>
              <MenuItem value="Sin">Sin</MenuItem>
              <MenuItem value="Description">Description</MenuItem>
              <MenuItem value="Violence">Violence</MenuItem>
              <MenuItem value="Grace">Grace</MenuItem>
            </Select>
          </FormControl>
          </Box>

          <Box sx={{p:4,width:"100%", display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={toggleColumns} variant="contained">
                  {showColumns ? "Error Analysis Mode" : "Human Evaluation Mode"}
                </Button>
          </Box>    

        </Box>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        
        {/* TaskTalbe */}
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
              {filteredRows
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
          Questions={classificationQuestions}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
          freeFormComment={freeFormComment}
          setFreeFormComment={setFreeFormComment}
          onSaveComment={handleSaveComment}
        />
      )}

      {showColumns && (
      <>
        <h2>Feedback Section</h2>
        <CommentSection comments={comments} onDelete={(index) => setComments(comments.filter((_, i) => i !== index))} />

        <h2>Import/Export Comments</h2>
        <ImportExport comments={comments} onImport={handleImport} />
      </>
    )}
    </>
  );
}
