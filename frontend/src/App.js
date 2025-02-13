import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import DataVisualisation from "./components/DataVisualisation";
import ErrorAnalysis from "./components/ErrorAnalysis";
import SecondaryDataVisualisation from "./components/SecondaryDataVisualisation";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Navigate replace to="/data-visualisation" />}
        />
        <Route path="/data-visualisation" element={<DataVisualisation />} />
        <Route path="/secondary-data-visualisation" element={<SecondaryDataVisualisation />} />
        <Route path="/error-analysis" element={<ErrorAnalysis />} />
      </Routes>
    </Router>
  );
}

export default App;
