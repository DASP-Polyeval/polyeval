import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import "bootstrap/dist/css/bootstrap.min.css";

const Yayi7b = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    // Fetch and parse the CSV file when the component mounts
    fetch("/yayi7b.csv")
      .then((response) => {
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((text) => {
        console.log("CSV Text:", text);
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            console.log("Parsed Results:", results);
            if (results.data.length > 0) {
              setHeaders(Object.keys(results.data[0])); // Set headers from first row
              setData(results.data); // Set data excluding headers
            }
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
          },
        });
      })
      .catch((error) => console.error("Error fetching the CSV file:", error));
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table
          className="table table-striped table-dark"
          style={{
            margin: "0 auto",
            borderCollapse: "collapse",
            width: "",
          }}
        >
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  style={{ border: "1px solid black", padding: "8px" }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, cellIndex) => (
                  <td
                    key={cellIndex}
                    style={{ border: "1px solid black", padding: "8px" }}
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Yayi7b;
