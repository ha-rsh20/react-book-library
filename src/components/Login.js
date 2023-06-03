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
import { useUserContext } from "./UserContext";

function Login() {
  const [users, setUsers] = useState([]);
  let [user, setUser] = useState("");
  const { setUserFirstName } = useUserContext();
  const { setUserId } = useUserContext();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Enter more than 3 characters"),
    email: Yup.string().email("Enter valid email address"),
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/app/showAllUsers")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        toast.error("Error in login!", {
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
  });
  const onLogin = (values) => {
    // axios
    //   .get("http://localhost:4000/app/showAllUsers")
    //   .then((res) => {
    //     if (res.status === 200) {
    //       console.log("Success");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    //console.log(values.email + " " + values.password);
    user = users.filter((u) => u.email.includes(values.email));
    console.log(user);

    if (
      user[0].email === values.email &&
      user[0].password === values.password
    ) {
      localStorage.setItem("login", true);
      localStorage.setItem("firstname", user[0].firstname);
      localStorage.setItem("lastname", user[0].lastname);
      localStorage.setItem("id", user[0].id);
      setUserFirstName(user[0].firstname);
      setUserId(user[0].id);
      navigate("/");
    } else {
      toast.error("Error in login!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    //setUser(users.filter((u) => u.email.includes(values.email)));
    //console.log(user);
    //localStorage.setItem("login", true);
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
        onSubmit={onLogin}
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
              </div>

              <Button type="submit" variant="contained" style={{ margin: 10 }}>
                Login
              </Button>
            </ThemeProvider>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}

export default Login;
