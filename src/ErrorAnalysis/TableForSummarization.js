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
    "ሰነድ: የ28 አመቷ ሴት ስሟ እንዲገለጥ ያልተፈለገ ሲሆን ንቦቹ አይኗ ውሰጥ ሲገቡ እርሷ አረም እያረመች ነበር ተብሏል። ዶ/ር ሆንግ ቺ ቲንግ ከታማሚዋ አይን ውስት አራት ሚሊ ሜትር ርዝመት ያላቸው ሃሊሲቲዴት ተብለው የሚጠሩት ወይም ማንኛውንም እርጥበት ስለሚወዱ በተለምዲ ላብ ቀሳሚ የሚል ስያሜ ያላቸው ንቦችን ጎትተው ሲያወጡ ክው ብለው ደንግጠው ነበር። ታማሚዋ አሁን ከሆስፒታል የወጣች ሲሆን በቤቷ ሆና እያገገመች ነው ተብሏል። ስዊት ቢ (ላብ ቀሳሚ) የሚባሉት የንብ ዝርያዎች በማንኛውም እርጥበት የሚሳቡ ሲሆን ላብና እንባን ለመቅሰም ሲሉ ወደ ሰዎች ይመጣሉ። ያለባቸውን ከፍተኛ የሆነ የፕሮቲን ፍላጎት ለማሟላትም እንባ ቀለባቸው ነው ሲሉ ይናገራሉ ባለሙያዎች። • \"ኢትዮጵያ የከሸፈች ሀገር እየሆነች ነው\" ሻለቃ ዳዊት • የኢቲ 302 የመጨረሻዎቹ ስድስት ደቂቃዎች • ከ28 ዓመታት በኋላ ዳግም ለዕይታ የበቃው ተውኔት ታማሚዋ እነዚህ ንቦች የግራ አይኗ ውስጥ ተወርውረው ጥልቅ ሲሉ እርሷ የዘመዶቿ መቃብር ዙሪያ የበቀለ አረምን ትነቃቅል ነበር። የዘመዶቿን መቃብር ለመጎብኘት የሄደችው ደግሞ በሀገሩ ባህልና ወግ መሰረት አመታዊ ልምዷን ለማድረስ ነበር። ንፋስ ነፍሶ አይኗ ውስጥ አንዳች ነገር ሲገባ ገምታ የነበረው ቆሻሻ እንደገባባት ነበር። ከሰአታት በኋላ ግን አይኗ እንዳበጠ ሲሆን ህመሙም እየጠነከረ መጣ። ያኔ ነው ሐኪም ወዳለበት ያመራችው። ሆስፒታል ደርሳ ያዩትን ለቢቢሲ ያስረዱት ሐኪም \"አይኖቿን ሙሉ በሙሉ አልጨፈነችውም ነበር። በነበረው ክፍተት በአጉሊ መነፅር ስመለከት የነፍሳት እግር የሚመስል ጥቁር ነገር አየሁ። \" ይላሉ። \"ከዚያም አንዱን ይዤ ቀስ ብዬ አወጣሁት። ከዛ ሌላ፣ ደግሞ ሌላ፣ እንደገና ሌላ። ሁሉም በሕይወት ነበሩ። \" ዶክተሩ አክለውም ንቦቹ ሊሞቱ ይችሉ ነበር። ንፋሱ ያመጣው አቧራ ላይ ተጣብቀው እንዲቆዩ አድርጓቸው ነው ብለዋል። \"እነዚህ ንቦች ሰው አይተናኮሉም ነገር ግን ላብ ይጠጣሉ። ስማቸውም ከዚያ የመጣ ነው\" ሲሉ ያብራራሉ። ታማሚዋ ንቦቹ አይኖቿ ውስጥ እንደገቡ አይኗን አለማሸቷ እንደረዳት ያሰመሩበት ዶክተሩ \"ኮንታክት ሌንስ ስላደረገች ለማሸት አልፈለገችም። ምክንያቱም ሌንሱ ይሰበራል ብላ ሰግታለች። ያንን አለማድረጓ ደግሞ ንቦቹ መርዛቸውን እንዳይረጩ አድርጓል። ያ ሆኖ ቢሆን ኖሮ ትሞት ነበር\" ብለዋል። ንቦቹ አሁንም በሕይወት ያሉ ሲሆን ለምርምር ወደ ቤተ ሙከራ ተልከዋል።\nበቀደመው ጽሑፍ ላይ በመመስረት አንድ አጭር ማጠቃለያ ያቅርቡ:",
    "በታይዋን ከአንዲት ሴት አይን ውስጥ ዶክተሮች አራት ንቦችን አወጡ። በደሴቲቱ እንዲህ አይነት ነገር ታይቶም ተሰምቶም አይታወቅም ሲሉ ተናግረዋል።",
    " "
  ),
];

export default function Summarization() {
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
