import React from "react";
import ErrorAnalysis from "./ErrorAnalysis/ErrorAnalysis.js";

import LoginSignup from "./Components/LoginSignup/LoginSignup.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const NotFound = () => {
  return <h2>404 Page Not Found</h2>;
};

function App() {
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
          <Route path="/login" element={<LoginSignup />} />
          {/* task4.1 */}
          <Route path="/analysis/*" element={<ErrorAnalysis />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
