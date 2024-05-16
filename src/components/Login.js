import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, ThemeProvider } from "@mui/material";
import { theme } from "../mui_style";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateUserFirstName } from "../state/slice/userSlice";
import { updateUserLastName } from "../state/slice/userSlice";
import { updateUserRole } from "../state/slice/userSlice";
import { updateUserId } from "../state/slice/userSlice";
import { updateUserLoggedIn } from "../state/slice/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Please type your email")
      .email("Enter valid email address"),
    password: Yup.string().required("Please type your password"),
  });

  const setUp = (fname, lname, id, role) => {
    dispatch(updateUserFirstName(fname));
    dispatch(updateUserLastName(lname));
    dispatch(updateUserRole(role));
    dispatch(updateUserId(id));
    dispatch(updateUserLoggedIn(true));
    localStorage.setItem("loggedIn", true);
    localStorage.setItem("firstname", fname);
    localStorage.setItem("lastname", lname);
    localStorage.setItem("id", id);
    localStorage.setItem("role", role);
  };

  const onLogin = (values) => {
    let cred = {
      email: values.email,
      password: values.password,
    };
    axios
      .post("http://localhost:4000/user/login", cred)
      .then((res) => {
        if (res.status === 201) {
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("rtoken", res.data.refreshToken);

          setUp(
            res.data.user.firstname,
            res.data.user.lastname,
            res.data.user.id,
            res.data.user.role
          );

          toast.success("Login Successful!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else if (res.status === 203) {
          toast.error("Invalid password!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (res.status === 204) {
          toast.error("Credential not found!", {
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
      })
      .catch((err) => {
        toast.error("Error Occured!", {
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
