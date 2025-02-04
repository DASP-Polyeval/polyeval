import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';

const TextClassification = ({ externalTabValue, filters }) => {
  const [csvData, setCsvData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Effect to fetch CSV data when filters change
  React.useEffect(() => {
    // Reset previous state
    setCsvData(null);
    setIsLoading(false);
    setError(null);

    // Check if we have a dataset to fetch
    if (!filters?.dataset) {
      setError("Please select a dataset");
      return;
    }

    // Start loading
    setIsLoading(true);

    // Fetch CSV file
    fetch(`/${filters.dataset}.csv`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((text) => {
        // Parse CSV text into array of objects
        const lines = text.split('\n').map(line => line.trim()).filter(line => line);
        
        if (lines.length > 1) {
          const headers = lines[0].split(',').map(h => h.trim());
          const data = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim());
            return headers.reduce((obj, header, index) => {
              obj[header] = values[index];
              return obj;
            }, {});
          });

          // Filter data based on language selection if applicable
          if (filters.filterType === 'language' && filters.filterValue) {
            const filterValues = Array.isArray(filters.filterValue) 
              ? filters.filterValue 
              : [filters.filterValue];
            
            const filteredData = data.filter(row => 
              row.language && filterValues.includes(row.language)
            );

            if (filteredData.length === 0) {
              setError("No data available for the selected language(s)");
              setIsLoading(false);
              return;
            }

            setCsvData(filteredData);
          } else if (filters.filterType === 'model' && filters.filterValue) {
            // Find the model row
            const modelRow = data.find(row => row[headers[0]] === filters.filterValue);
            
            if (modelRow) {
              // Find the 'avg' column index
              const avgColumnIndex = headers.findIndex(h => 
                h.toLowerCase() === 'avg' || h.toLowerCase() === 'average'
              );

              // Prepare language data for graph
              const languageColumns = headers.slice(avgColumnIndex + 1);
              const graphData = languageColumns
                .map(lang => ({
                  language: lang,
                  value: parseFloat(modelRow[lang]) || 0
                }))
                // Remove languages with zero value and sort
                .filter(item => item.value > 0)
                .sort((a, b) => b.value - a.value);

              if (graphData.length === 0) {
                setError(`No performance data found for ${filters.filterValue}`);
                setIsLoading(false);
                return;
              }

              setCsvData(graphData);
            } else {
              setError(`Model ${filters.filterValue} not found in the dataset`);
            }
          } else {
            setCsvData(data);
          }
        } else {
          throw new Error('CSV file is empty or malformed');
        }
        
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching CSV:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, [filters]);

  // Render loading state
  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100%" 
        minHeight="400px"
        sx={{ 
          backgroundColor: '#f8f8f8', 
          borderRadius: 2, 
          p: 2,
          width: 'calc(100% - 60px)', 
          marginLeft: '30px' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Render error state
  if (error) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100%" 
        minHeight="400px"
        sx={{ 
          backgroundColor: '#f8f8f8', 
          borderRadius: 2, 
          p: 2,
          width: 'calc(100% - 60px)', 
          marginLeft: '30px', 
        }}
      >
        <Typography color="error" variant="body1" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  // Render no data state
  if (!csvData || csvData.length === 0) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100%" 
        minHeight="400px"
        sx={{ 
          backgroundColor: '#f8f8f8', 
          borderRadius: 2, 
          p: 2,
          width: 'calc(100% - 60px)', 
          marginLeft: '30px', 
        }}
      >
        <Typography variant="body1" align="center" color="textSecondary">
          No data available. Please select a dataset and apply filters.
        </Typography>
      </Box>
    );
  }

  // Render graph for model selection
  if (filters.filterType === 'model') {
    // Prepare data for BarChart
    const chartData = {
      xAxis: [
        {
          id: 'languages',
          data: csvData.map(item => item.language),
          scaleType: 'band',
        }
      ],
      series: [
        {
          data: csvData.map(item => item.value),
          label: `${filters.filterValue} Performance`,
          color: '#1976d2', // Material-UI primary blue
        }
      ],
    };

    return (
      <Box 
        sx={{ 
          width: 'calc(100% - 60px)', 
          marginLeft: '30px',
          height: '500px',
          backgroundColor: '#f8f8f8',
          borderRadius: 2,
          p: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography variant="h6" gutterBottom>
          {filters.filterValue} Performance Across Languages
        </Typography>
        
        <Box sx={{ flex: 1 }}>
          <BarChart
            {...chartData}
            height={400}
            margin={{ left: 80, right: 50, top: 20, bottom: 50 }}
            xAxis={[
              {
                ...chartData.xAxis[0],
                label: 'Languages',
                labelStyle: {
                  fontSize: 14,
                  marginTop: 150, // Increased margin to move further down
                  
                },
                tickLabelStyle: {
                  angle: -15, // Rotate labels to prevent overlap
                  textAnchor: 'end',
                  fontSize: 10,
                },
              }
            ]}
            yAxis={[
              {
                label: 'Performance',
                labelStyle: {
                  fontSize: 14,
                  marginLeft: 50, // Increased margin to move further away
                  
                },
                tickLabelStyle: {
                  fontSize: 12,
                },
              }
            ]}
            slotProps={{
              legend: {
                hidden: true, // Hide legend if not needed
              },
            }}
            tooltip={{
              trigger: 'item',
            }}
          />
        </Box>
      </Box>
    );
  }

  // Render table for language filter
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {filters.dataset} Data
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(csvData[0])
                .filter(col => !['id', '_id', 'timestamp'].includes(col))
                .map((column) => (
                  <TableCell key={column}>{column}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {csvData.map((row, index) => (
              <TableRow key={index}>
                {Object.entries(row)
                  .filter(([key]) => !['id', '_id', 'timestamp'].includes(key))
                  .map(([key, value]) => (
                    <TableCell key={key}>
                      {typeof value === 'number' || !isNaN(parseFloat(value))
                        ? Number(value).toFixed(4)
                        : value}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TextClassification;
