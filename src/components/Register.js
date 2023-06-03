import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, ThemeProvider } from "@mui/material";
import { theme } from "../mui_style";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function Register() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const initialValues = {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
    confirm_password: "",
  };

  const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().min(3, "Enter more than 3 characters"),
    lastname: Yup.string().min(3, "Enter more than 3 characters"),
    email: Yup.string().email("Enter valid email address"),
    password: Yup.string()
      .min(8, "Password must have at least 8 characters")
      .matches(/[0-9]/, getCharacterValidationError("digit"))
      .matches(/[a-z]/, getCharacterValidationError("lowercase"))
      .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
    confirm_password: Yup.string()
      .required("Please re-type your password")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  useEffect(() => {
    // console.log("New value of name:" + name);
    // return () => {
    //   console.log("Old value of name:" + name);
    // };
    axios
      .get("http://localhost:4000/app/showAllUsers")
      .then((res) => {
        setUser(res.data);
        //console.log(user);
        //console.log(user.length);
      })
      .catch();
  }, []);

  const onFormSubmit = (values) => {
    // console.log("Name:" + name);
    // console.log("Email:" + email);
    console.log("On the form submit", values);
    values.id = user[user.length - 1].id + 1;
    // const requestData = {
    //   userName: values.name,
    //   userEmail: values.email,
    // }

    // axios.post("https://jsonplaceholder.typicode.com/posts",requestData);
    axios
      .post("http://localhost:4000/app/addUser", values)
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data.id);
          // toast("Success on form submission!");
          toast.success("Registered successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error occured to register!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  return (
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
            <ThemeProvider theme={theme}>
              <div
                style={{
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  type="text"
                  variant="outlined"
                  label="First Name"
                  name="firstname"
                  placeholder="enter first-name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
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
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  type="text"
                  variant="outlined"
                  label="Last name"
                  name="lastname"
                  placeholder="enter last-name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
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
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  type="email"
                  variant="outlined"
                  label="Email"
                  name="email"
                  placeholder="enter email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
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
              <div
                style={{
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <InputLabel id="role" required>
                  Role
                </InputLabel>
                <Select
                  labelId="role-select"
                  id="role-select"
                  label="Role"
                  name="role"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Seller">Seller</MenuItem>
                  <MenuItem value="Buyer">Buyer</MenuItem>
                </Select>
              </div>
              <div
                style={{
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  type="password"
                  variant="outlined"
                  label="Password"
                  name="password"
                  placeholder="enter password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.password && (
                  <span
                    style={{
                      padding: 5,
                      color: "red",
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    {errors.password}
                  </span>
                )}
              </div>
              <div
                style={{
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  type="password"
                  variant="outlined"
                  label="Confitm password"
                  name="confirm_password"
                  placeholder="confirm password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.confirm_password && (
                  <span
                    style={{
                      padding: 5,
                      color: "red",
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    {errors.confirm_password}
                  </span>
                )}
              </div>
              <Button type="submit" variant="contained" style={{ margin: 10 }}>
                Register
              </Button>
            </ThemeProvider>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}

export default Register;
