import React from "react";
import CsvDisplay from "./CSVDisplay";
import DropdownComponent from "./components/Dropdown";
import Navigation from "./components/Navigation";
import Emma500llama27b from "./components/Emma500llama27b";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <div>
        {" "}
        <Navigation />
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-1"></div>

          <div className="col-md-4">
            <DropdownComponent />
          </div>

          <div className="col-md-3"></div>

          <div className="col-md-4">
            <DropdownComponent />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
