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
import ToggleButton from "./ToggleButton";
import { Box,Button } from "@mui/material";

import Rating from "../Components/Rating/Rating";
import FeedbackForm from "../ReviewComment/FeedbackForm";
import CommentSection from "../ReviewComment/CommentSection";
import ImportExport from "../ReviewComment/ImportExport";

const errorAnalysisColumns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "text", label: "Text", minWidth: 170 },
  {
    id: "refText",
    label: "Reference Text",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "hypText",
    label: "Hypothesis Text",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const humanEvaluationColumns = errorAnalysisColumns.concat([
  
  { id: "rating", label: "Rating", minWidth: 170 },
  { id: "comment", label: "Action", minWidth: 170, align: "left" },
]);

function createData(id,text, refText, hypText) {
  return { id,text, refText, hypText };
}

const rows = [
  createData(
    1,
    '"کامو جينو نا تيكويه عمو ٤ بولن ڽڠ هانا ديابيتيس ڽڠ اوايجيه ساکيت ديابيتيس،" غتامه لى غوبڽن.',
    '"We now have 4-month-old mice that are non-diabetic that used to be diabetic," he added.',
    "This is an old saying that is still very true today. It means that if you want to get a good job you must have a good education."
  ),
  createData(
    2,
    "دلهاوسي دي هليفاک‌س، نوفا سکوتيا ڠون کڤالا ديۏيسي كلينيس ڠون علميه دري اسوسياسي ديابيتيس کانادا ݢڤئيڠت بهوا ڤنليتين ڽو منتوڠ لم ماس ڽڠ کفون.",
    "Dr. Ehud Ur, professor of medicine at Dalhousie University in Halifax, Nova Scotia and chair of the clinical and scientific division of the Canadian Diabetes Association cautioned that the research is still in its early days.",
    "Doctor Ado, a physicist, is the head of the Israeli delegation to the United Nations and is a member of the Scientific Committee on the Peaceful Uses of Outer Space."
  ),
];

const translationQuestions = [
  'Are there specific phrases that seem mistranslated?',
  'Did the translation omit any important details?',
];


export default function TableForMachineTranslaiton() {
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

        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          {/* ConvertButton */}
          <ToggleButton />
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
          Questions={translationQuestions}
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
