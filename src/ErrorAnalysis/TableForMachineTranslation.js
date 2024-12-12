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
import { Box } from "@mui/material";

const columns = [
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

function createData(text, refText, hypText) {
  return { text, refText, hypText };
}

const rows = [
  createData(
    '"کامو جينو نا تيكويه عمو ٤ بولن ڽڠ هانا ديابيتيس ڽڠ اوايجيه ساکيت ديابيتيس،" غتامه لى غوبڽن.',
    '"We now have 4-month-old mice that are non-diabetic that used to be diabetic," he added.',
    "This is an old saying that is still very true today. It means that if you want to get a good job you must have a good education."
  ),
  createData(
    "دلهاوسي دي هليفاک‌س، نوفا سکوتيا ڠون کڤالا ديۏيسي كلينيس ڠون علميه دري اسوسياسي ديابيتيس کانادا ݢڤئيڠت بهوا ڤنليتين ڽو منتوڠ لم ماس ڽڠ کفون.",
    "Dr. Ehud Ur, professor of medicine at Dalhousie University in Halifax, Nova Scotia and chair of the clinical and scientific division of the Canadian Diabetes Association cautioned that the research is still in its early days.",
    "Doctor Ado, a physicist, is the head of the Israeli delegation to the United Nations and is a member of the Scientific Committee on the Peaceful Uses of Outer Space."
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
    </>
  );
}
