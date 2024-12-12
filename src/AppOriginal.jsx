import React from "react";
import Navigation from "./components/Navigation";
import DropdownComponent from "./components/Dropdown";

const App = () => {
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
};

export default App;
