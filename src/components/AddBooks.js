import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popover, Avatar, Button, ThemeProvider } from "@mui/material";
import { theme } from "../mui_style";
import TextField from "@mui/material/TextField";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function AddBooks() {
  const Navigate = useNavigate();
  const [name, setName] = useState("Harsh");
  const [email, setEmail] = useState("xyz@gmail.com");
  const [open, setOpen] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(false);
  };
  function toHome() {
    //alert("You want to home page!");
    //let name = prompt("What is your name?");
    //console.log(name);
    //console.log(window);
    // let confirm = window.confirm("Do you want to navigate to home?");
    // if (confirm) {
    Navigate("/");
    // }
    console.log(`name:${name},email:${email}`);
  }
  // function openPopover() {
  //   if (open) {
  //     setOpen(false);
  //   } else {
  //     setOpen(true);
  //   }
  // }
  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: 10 }}>AddBooks</div>
      <div
        style={{
          padding: 10,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div
          onClick={handleClick}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            columnGap: 10,
            cursor: "pointer",
          }}
        >
          <Avatar sx={{ bgcolor: "#202020" }}>HG</Avatar>
        </div>
      </div>
      <div
        style={{
          padding: 10,
          rowGap: 20,
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <TextField
          type="text"
          value={name}
          variant="outlined"
          label="Name"
          placeholder="enter name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          type="email"
          value={email}
          variant="outlined"
          label="Email"
          placeholder="enter email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button onClick={toHome} variant="contained">
          submit
        </Button>
      </div>
      <Popover
        open={open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <div style={{ padding: 10, display: "flex", flexDirection: "column" }}>
          <span>Harsh Gajjar</span>
          <div
            style={{
              borderBottom: "2px solid black",
              margin: 5,
            }}
          ></div>
          <Button onClick={toHome} variant="contained">
            <ExitToAppIcon />
          </Button>
        </div>
      </Popover>
    </ThemeProvider>
  );
}
