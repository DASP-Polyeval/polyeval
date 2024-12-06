import React from "react";
import { Button } from "@mui/material";
export default function TranslateButton() {
  function handleClick(event) {}

  return (
    <div>
      <p></p>
      <Button variant="contained" disabled onClick={handleClick}>
        translate
      </Button>
    </div>
  );
}

