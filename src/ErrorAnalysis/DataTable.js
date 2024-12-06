import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "text", label: "Text", minWidth: 170 },
  {
    id: "trueLabel",
    label: "True label",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "predictedLabel",
    label: "Predicted label",
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

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
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
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
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
  );
}
