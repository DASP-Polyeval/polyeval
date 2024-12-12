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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TranslateButton from "./TranslateButton";

const columns = [
  { id: "text", label: "Text", minWidth: 170 },
  {
    id: "trueLabel",
    label: "Correct Category",
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
    label: "Confident score",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(text, predictedLabel, trueLabel) {
  const ConfidentScore = null;
  return { text, predictedLabel, trueLabel, ConfidentScore };
}

const rows = [
  createData(
    "Bi Gor nup woŋg giniŋgiy gok, penpen ma aŋgiy, kapkap mindiy, biynimb direp giy, aŋgñirep giniŋgiy. Kuyip timey gey, pen timey ma giniŋgiy.",
    "Sin",
    "Recommendation"
  ),
  createData(
    "Yenen: Gor biynimb tep nuk gok kuyip kond mindyiŋg, minim apay ak niŋimb ak pen; biynimb timey gipay gok kuyip kirgip aŋgyak.",
    "Violence",
    "Faith"
  ),
  createData(
    "Pen chin per nimbip Biyomb chin ak wasemb ayip rek niŋiy, Gor nup tep aŋgjun. Nimbip simb niŋiy diniŋg, Kawnan nuk ak yokek, ap nimbip gos ñek mey, nup gosimb niŋiy, biynimb suŋ-tep nuk yimb mindpim. Kun ak, nup aŋgniŋiy, tep aŋgjun.",
    "Description",
    "Faith"
  ),
];

export default function TableForTextClassification({ sendButtonAction }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [category, setCategory] = useState(""); // Category filter
  const [label, setLabel] = useState(""); // Label filter

  // Filter rows based on search and category
  const filteredRows = rows.filter((row) => {
    const matchesCategory = category ? row.trueLabel === category : true;
    const matchesLabel = label ? row.predictedLabel === label : true;
    return matchesLabel && matchesCategory;
  });

  const [selectedRow, setSelectedRow] = useState(null); // Selected row state
  const handleRowClick = (row) => {
    setSelectedRow(row);
  };
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box sx={{ display: "flex", gap: 2, p: 2 }}>
          {/* Category Filter */}
          <FormControl fullWidth>
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
          <FormControl fullWidth>
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
              ,
            </Select>
          </FormControl>
        </Box>

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
    </>
  );
}
