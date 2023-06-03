import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Avatar, Popover, Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router";
import { useUserContext } from "./UserContext";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

function NavBar() {
  const [log, setLog] = useState();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { userId } = useUserContext();
  const { userFirstName } = useUserContext();
  const { setUserFirstName } = useUserContext();
  const { userLastName } = useUserContext();
  const { setUserLastName } = useUserContext();
  const { setUserId } = useUserContext();

  const logOut = () => {
    localStorage.setItem("login", false);
    localStorage.removeItem("firstname");
    localStorage.removeItem("id");
    setOpen(false);
    navigate("/");
    setUserFirstName("user");
    //console.log("logging out!");
  };
  useEffect(() => {
    let login = localStorage.getItem("login");
    if (login === "false") {
      setLog("false");
    } else {
      setLog("true");
    }
    if (localStorage.getItem("firstname")) {
      setUserFirstName(localStorage.getItem("firstname"));
    }
    if (localStorage.getItem("lastname")) {
      setUserLastName(localStorage.getItem("lastname"));
    }
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(false);
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">VBook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/addBooks">Add Books</Nav.Link>
            <Nav.Link href="/getBooks">Get Books</Nav.Link>
            <Nav.Link href="/cart">
              <ShoppingCartCheckoutIcon></ShoppingCartCheckoutIcon>
            </Nav.Link>
            <Nav.Link href="/addUser">Add User</Nav.Link>
            <Nav.Link href="/getUser">Get User</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div
        style={{
          marginRight: 20,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Nav className="me-auto">
          {log === "false" ? (
            <Nav.Link href="/register">Register</Nav.Link>
          ) : (
            <Nav
              onClick={handleClick}
              style={{
                cursor: "pointer",
              }}
            >
              <Avatar sx={{ bgcolor: "#ffffff", color: "#202020" }}>
                {userFirstName[0].toUpperCase()}
                {userLastName[0].toUpperCase()}
              </Avatar>
            </Nav>
          )}
          {log === "false" ? (
            <Nav.Link href="/login">Login</Nav.Link>
          ) : (
            console.log()
          )}
        </Nav>
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
          <span>
            {userFirstName} {userLastName}
          </span>
          <div
            style={{
              borderBottom: "2px solid black",
              margin: 5,
            }}
          ></div>
          <Button onClick={logOut} variant="contained">
            <ExitToAppIcon />
          </Button>
        </div>
      </Popover>
    </Navbar>
  );
}

export default NavBar;
