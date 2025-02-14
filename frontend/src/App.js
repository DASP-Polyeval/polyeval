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
import Analytics from "./components/Analytics";

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
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/error-analysis" element={<ErrorAnalysis />} />
      </Routes>
    </Router>
  );
}

export default App;
