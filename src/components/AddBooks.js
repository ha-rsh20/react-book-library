import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Popover, Avatar, Button, ThemeProvider } from "@mui/material";
import { theme } from "../mui_style";
import TextField from "@mui/material/TextField";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Formik } from "formik";
import * as Yup from "yup";

export default function AddBooks() {
  const Navigate = useNavigate();
  // const [name, setName] = useState("Harsh");
  // const [email, setEmail] = useState("20it033@charusat.edu.in");
  const [open, setOpen] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const initialValues = {
    name: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Enter more than 3 characters"),
    email: Yup.string().email("Enter valid email address"),
  });
  //useeffect:if array is empty means when page will be loaded it will excuted
  //useeffect:if array is filled with variables,it will check changes in varibles if it will be then will be excuted
  useEffect(() => {
    console.log("Hello!");
    // console.log("New value of name:" + name);

    // return () => {
    //   console.log("Old value of name:" + name);
    // };
  }, []);

  function toHome() {
    //alert("You want to home page!");
    //let name = prompt("What is your name?");
    //console.log(name);
    //console.log(window);
    // let confirm = window.confirm("Do you want to navigate to home?");
    // if (confirm) {
    Navigate("/");
    // }
    // console.log(`name:${name},email:${email}`);
  }
  // function openPopover() {
  //   if (open) {
  //     setOpen(false);
  //   } else {
  //     setOpen(true);
  //   }
  // }
  const onFormSubmit = (values) => {
    // console.log("Name:" + name);
    // console.log("Email:" + email);
    console.log("On the form submit" + values);
    alert("Form submitted!");
    Navigate("/");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(false);
  };

  return (
    <div style={{ padding: 10 }}>
      AddBooks
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
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onFormSubmit}
        >
          {({
            value,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 5,
                }}
              >
                <TextField
                  variant="outlined"
                  type="text"
                  label="Name"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && (
                  <span
                    style={{
                      padding: 5,
                      color: "red",
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    {errors.name}
                  </span>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 5,
                }}
              >
                <TextField
                  variant="outlined"
                  type="email"
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && (
                  <span
                    style={{
                      padding: 5,
                      color: "red",
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    {errors.email}
                  </span>
                )}
              </div>
              <Button variant="contained" type="submit" className="">
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </div>
      {/* <Popover
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
      </Popover> */}
    </div>
  );
}
