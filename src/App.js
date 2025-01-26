import React from "react";
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import ErrorAnalysis from "./ErrorAnalysis/ErrorAnalysis";

import LoginSignup from "./Components/LoginSignup/LoginSignup";
import TextHighlighter from "./Components/TextHighlighter";

import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import ReviewComment from "./ReviewComment/ReviewComment";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div>
        <h1 style={{ textAlign: "center" }}>Polyeval</h1>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/analysis">ErrorAnalysis</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ReviewComment setIsAuthenticated={setIsAuthenticated} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          // task4.1
          <Route path="/analysis/*" element={<ErrorAnalysis />} />
        </Routes>
      </div>
    </Router>
  );
}
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);

export default App;
