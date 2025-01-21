import React from "react";
import BasicTabs from "./TaskTab";
import { Link, Outlet } from "react-router-dom";
function ErrorAnalysis() {
  return (
    <>
      <div>
        <h2>4.1 Error Analysis</h2>
        {/* <nav>
          <ul>
            <li>
              <Link to="/analysis/rating">Rating</Link>
            </li>
          </ul>
        </nav>
        <Outlet /> */}
      </div>
      <BasicTabs />
    </>
  );
}

export default ErrorAnalysis;
