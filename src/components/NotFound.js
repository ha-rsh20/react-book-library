import { Button, ThemeProvider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../mui_style";

function NotFound() {
  const Navigate = useNavigate();

  function toHome() {
    let confirm = window.confirm("Do you want to navigate to home?");
    if (confirm) {
      Navigate("/");
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <div>
        Page not found!
        <br />
        <Button variant="contained" onClick={toHome}>
          Go back to home
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default NotFound;
