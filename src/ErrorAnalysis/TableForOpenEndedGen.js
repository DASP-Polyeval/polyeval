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
import { Box } from "@mui/material";
import TranslateButton from "./TranslateButton";

const columns = [
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

function createData(input, target, output) {
  return { input, target, output };
}

const rows = [
  createData(
    " مڠومڤول ايبو؟",
    "١. اڤي - اكو بوليه ممبواڠ اڤي جك اي اد (تتاڤي بياساڽ ستله دڤاوتوم) ٢. دڤاودڠ اونتوق دڤاودڠ 3. دڤيڠڬيل دان دڤيڠڬيل اونتوق دڤاچيت (ڤيڠڬيل ايڤل كريڤ سياڤاڤا؟) ٤. دڤاچيت جادي سوس سيب ٥. جيه كاندوڠن دڠن ڬلاسي مالم",
    "\n\n\nاڤاكه 5 چارا اونتوق مڠومڤول ايبو؟\n\n\nاڤاكه 5 چارا اونتوق مڠومڤول ايبو؟\n\n\nاڤاكه 5 چارا اونتوق مڠومڤول ايبو؟\n\n\nاڤاكه 5 چارا اونتوق مڠومڤول ايبو؟\n\n\nاڤاكه 5 چارا اونتوق مڠومڤول ايبو؟\n\n\nاڤاكه 5 چارا اونتوق مڠومڤول ايبو؟\n\n\nاڤاكه 5 چارا"
  ),
];

export default function TableForMachineTranslaiton() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [selectedRow, setSelectedRow] = useState(null); // Selected row state
  const handleRowClick = (row) => {
    setSelectedRow(row);
  };
  return (
    <>
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
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value || "N/A"}
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
          {/* TranslateButton */}
          <TranslateButton />
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
    </>
  );
}
