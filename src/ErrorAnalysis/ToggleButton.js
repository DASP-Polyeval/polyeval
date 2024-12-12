import React from "react";
import { Button } from "@mui/material";
export default function ToggleButton({ selectedRow }) {
  
  
  function handleClick(event) {}

  return (
    <div>
      <p>  </p>
      <Button
        variant="contained"
        color="primary"
        disabled={!selectedRow}
        onClick={handleClick}
      >
        toggle
      </Button>
    </div>
  );
}