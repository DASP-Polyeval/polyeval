import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

import Button from "@mui/material/Button";

import TranslateButton from "./TranslateButton";
import CommentSidebar from "./CommentSidebar";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
} from "@mui/material";

const Selector = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [feedbacks, setFeedbacks] = useState([]);

  const [taskTypes, setTaskTypes] = useState([]);
  const [benchmarks, setBenchmarks] = useState([]);
  const [models, setModels] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [selectedTaskType, setSelectedTaskType] = useState("");
  const [selectedBenchmark, setSelectedBenchmark] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [jsonData, setJsonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // filtered data
  const [predictedFilter, setPredictedFilter] = useState(""); // filter：predicted_category
  const [correctFilter, setCorrectFilter] = useState(""); // filter：correct_category
  // the unique predicted_category values
  const [uniquePredictedCategories, setUniquePredictedCategories] = useState(
    []
  );
  // the unique correct_category values
  const [uniqueCorrectCategories, setUniqueCorrectCategories] = useState([]);

  // Fetch and Handle dropdown menus changes
  const fetchOptions = useCallback(() => {
    axios
      .post("http://127.0.0.1:5001/api/options", {
        task_type: selectedTaskType,
        benchmark: selectedBenchmark,
        model: selectedModel,
        language: selectedLanguage,
      })
      .then((response) => {
        const { task_types, benchmarks, models, languages } = response.data;
        setTaskTypes(task_types); // update task type options
        setBenchmarks(benchmarks); // update benchmark options
        setModels(models); // update model options
        setLanguages(languages); // update language options
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, [selectedTaskType, selectedBenchmark, selectedModel, selectedLanguage]);

  // initial fetch options
  useEffect(() => {
    fetchOptions(); // Fetch options on component mount at first time
  }, [fetchOptions]);

  // update dropdown menu when option changes
  const handleTaskTypeChange = (event) => {
    setSelectedTaskType(event.target.value);
    setSelectedBenchmark(""); // clear other selections
    setSelectedModel("");
    setSelectedLanguage("");
    fetchOptions(); // according to the new options, get the restricted options
  };

  const handleBenchmarkChange = (event) => {
    setSelectedBenchmark(event.target.value);
    setSelectedModel("");
    setSelectedLanguage("");
    fetchOptions();
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
    setSelectedLanguage("");
    fetchOptions();
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    fetchOptions();
  };

  // handle clear selections
  const handleClearSelections = () => {
    setSelectedTaskType("");
    setSelectedBenchmark("");
    setSelectedModel("");
    setSelectedLanguage("");
    fetchOptions(); // get all options after clearing selections
  };

  // Handle user selection and send API request
  const handleSubmit = () => {
    if (!selectedBenchmark || !selectedModel || !selectedLanguage) {
      alert("Please select all fields.");
      return;
    }

    setPredictedFilter(""); // Clear Predicted Category filter
    setCorrectFilter(""); // Clear Correct Category filter

    axios
      .post("http://127.0.0.1:5001/api/get-json", {
        task_type: selectedTaskType,
        benchmark: selectedBenchmark,
        model: selectedModel,
        language: selectedLanguage,
      })
      .then((response) => {
        const { task_type, json_data, headers } = response.data; // get json_data from response
        if (Array.isArray(json_data) && json_data.length > 0) {
          setHeaders(headers); // set headers based on first object in array (Object.keys(json_data[0]))
          // check if data is an array
          setJsonData(json_data);
          setTaskType(task_type);
          setFilteredData(json_data); // initialize filtered data with all data

          // set unique category values if task_type is classification
          if (task_type === "classification") {
            setUniquePredictedCategories([
              ...new Set(json_data.map((row) => row["Predicted Category"])),
            ]);
            setUniqueCorrectCategories([
              ...new Set(json_data.map((row) => row["Correct Category"])),
            ]);
          } else {
            setUniquePredictedCategories([]);
            setUniqueCorrectCategories([]);
          }
        } else {
          console.error("Expected an array, but got:", json_data);
        }
      })
      .catch((error) => {
        alert("Error fetching JSON data.");
        console.error(
          "Error fetching JSON:",
          error.response?.data || error.message
        );
      });
  };

  const [page, setPage] = useState(0); // current page number
  const [rowsPerPage, setRowsPerPage] = useState(20); // number of rows per page
  const [headers, setHeaders] = useState([]); // headers for the table
  const [taskType, setTaskType] = useState(""); // task type
  const [selectedRow, setSelectedRow] = useState(null); // Selected row state
  const [expandedRow, setExpandedRow] = useState(null); // Show expanded row content

  // handle the change of the page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // handle the change of the number of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset to the first page
  };

  // handle row click event
  const handleRowClick = (row) => {
    setSelectedRow(row);
    setExpandedRow(row); // Set expanded row to the clicked row
  };

  // filter the data based on the selected caterory
  useEffect(() => {
    let filtered = [...jsonData];

    if (predictedFilter) {
      filtered = filtered.filter(
        (row) => row["Predicted Category"] === predictedFilter
      );
    }

    if (correctFilter) {
      filtered = filtered.filter(
        (row) => row["Correct Category"] === correctFilter
      );
    }

    setFilteredData(filtered);
  }, [predictedFilter, correctFilter, jsonData]);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  // const handleAddFeedback = (feedback) => {
  //   setFeedbacks([...feedbacks, feedback]);
  // };

  return (
    <div>
      <Box display="flex" gap={2}>
        <Box flex={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              width: 300,
              margin: "10 auto",
              paddingLeft: "10px",
            }}
          >
            {/* Dropdown menu for task type */}
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="task-type-label">Task type</InputLabel>
              <Select
                labelId="task-taype-label"
                id="task-type-select"
                value={selectedTaskType}
                onChange={handleTaskTypeChange}
                label="TaskType"
              >
                <MenuItem value="">-- Select Task type --</MenuItem>{" "}
                {/* Clear the selection  */}
                {taskTypes.map((taskType, index) => (
                  <MenuItem key={index} value={taskType}>
                    {taskType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Dropdown menu for benchmark */}
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="benchmark-label">Benchmark</InputLabel>
              <Select
                labelId="benchmark-label"
                id="benchmark-select"
                value={selectedBenchmark}
                onChange={handleBenchmarkChange}
                // onChange={(e) => setSelectedBenchmark(e.target.value)}
                label="Benchmark"
              >
                <MenuItem value="">-- Select Benchmark --</MenuItem>
                {benchmarks.map((benchmark, index) => (
                  <MenuItem key={index} value={benchmark}>
                    {benchmark}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* Dropdown menu for model */}
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="model-label">Model</InputLabel>
              <Select
                labelId="model-label"
                id="model-select"
                value={selectedModel}
                onChange={handleModelChange}
                // onChange={(e) => setSelectedModel(e.target.value)}
                label="Model"
              >
                <MenuItem value="">-- Select Model --</MenuItem>
                {models.map((model, index) => (
                  <MenuItem key={index} value={model}>
                    {model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* Dropdown menu for language */}
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="language-label">Language</InputLabel>
              <Select
                labelId="language-label"
                id="language-select"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                // onChange={(e) => setSelectedLanguage(e.target.value)}
                className="p-2 border"
              >
                <MenuItem value="">-- Select Language --</MenuItem>
                {languages.map((language, index) => (
                  <MenuItem key={index} value={language}>
                    {language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              width: 300,
              margin: "10 auto",
              padding: "10px",
            }}
          >
            <Button variant="outlined" color="primary" onClick={handleSubmit}>
              Submit
            </Button>

            {/* Clear All Selections Button */}
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClearSelections}
            >
              Clear All
            </Button>
          </Box>

          {/* Convert json array to table */}
          {jsonData && (
            <div className="mt-6">
              {console.log("jsonData:", jsonData)}
              {console.log("Type of jsonData:", typeof jsonData)}
              <Paper sx={{ width: "100%", overflow: "auto", padding: 2 }}>
                <Typography
                  variant="h6"
                  align="left"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Task Type: {taskType}
                </Typography>

                {/* Filter for category（only for Classification task） */}
                {taskType === "classification" && (
                  <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
                    {/* Predicted Category filter*/}
                    <FormControl fullWidth>
                      <InputLabel>Filter by Predicted Category</InputLabel>
                      <Select
                        value={predictedFilter}
                        onChange={(e) => setPredictedFilter(e.target.value)}
                      >
                        <MenuItem value="">None</MenuItem>
                        {uniquePredictedCategories.map((category, index) => (
                          <MenuItem key={index} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Correct Category filter */}
                    <FormControl fullWidth>
                      <InputLabel>Filter by Correct Category</InputLabel>
                      <Select
                        value={correctFilter}
                        onChange={(e) => setCorrectFilter(e.target.value)}
                      >
                        <MenuItem value="">None</MenuItem>
                        {uniqueCorrectCategories.map((category, index) => (
                          <MenuItem key={index} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                )}

                <TableContainer component={Paper}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {headers.map((header, index) => (
                          <TableCell
                            key={index}
                            align={header.align}
                            style={{ minWidth: header.minWidth }}
                            sx={{ fontWeight: "bold" }}
                          >
                            {header}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filteredData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        ) // show only the rows for the current page
                        .map((row, rowIndex) => (
                          <React.Fragment key={rowIndex}>
                            <TableRow
                              key={rowIndex}
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              //activate selected row
                              onClick={() => handleRowClick(row)}
                              selected={selectedRow === row}
                              sx={{
                                cursor: "pointer",
                                backgroundColor:
                                  selectedRow === row ? "lightblue" : "white",
                              }}
                            >
                              {headers.map((header, cellIndex) => (
                                <TableCell key={cellIndex}>
                                  {row[header]}
                                </TableCell>
                              ))}
                            </TableRow>
                            {/* Extended row for Translation and Comment */}
                            {expandedRow === row && (
                              <TableRow>
                                <TableCell colSpan={headers.length}>
                                  {/* Translate Button */}
                                  <TranslateButton selectedRow={row} />
                                  {/* Comment Button */}
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleOpenSidebar}
                                  >
                                    Comment
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )}
                          </React.Fragment>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Table pagination component */}
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, 20]} // rows per page options
                  component="div"
                  count={jsonData.length} // the total number of rows
                  rowsPerPage={rowsPerPage} // current rows per page
                  page={page} //
                  onPageChange={handleChangePage} // handle page change
                  onRowsPerPageChange={handleChangeRowsPerPage} // handle rows per page change
                />
              </Paper>
            </div>
          )}
        </Box>

        {/* Right comment sidebar component*/}
        <CommentSidebar
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
          selectedRow={selectedRow}
          // onSubmit={handleAddFeedback}
        />
      </Box>
    </div>
  );
};

export default Selector;
