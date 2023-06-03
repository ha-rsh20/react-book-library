import React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Button, TextField, ThemeProvider } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "../mui_style";
import Pagination from "./Pagination";

function GetUser() {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const dataFetch = useRef(false);
  const [page, setPage] = useState(1);

  const postPerPage = 5;
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  let currentPosts = user.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setPage(pageNumber);
  };

  const onDelete = (id) => {
    //console.log(id);
    axios
      .delete("http://localhost:4000/app/deleteUser/" + id)
      .then((res) => {
        if (res.status === 200) {
          toast.success("User deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          currentPosts = currentPosts.filter((book) => book.id !== id);
        }
      })
      .catch((err) => {
        toast.error("Error in deleting user!", {
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
    currentPosts.filter((user) => user.id !== id);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/app/showAllUsers")
      .then((res) => {
        setUser(res.data);
        //console.log(user);
        toast.success("Success on fetching user details!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        toast.error("Error in fetching user details!", {
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
  }, []);
  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            id="filled-basic"
            label="Search"
            variant="filled"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <Pagination
        postPerPage={postPerPage}
        totalPosts={user.length}
        paginate={paginate}
        currentPage={page}
      />
      <div className="container" style={{ marginBottom: 20 }}>
        <div className="row">
          <div className="col-1">First name</div>
          <div className="col-1">Last name</div>
          <div className="col-4">Email</div>
          <div className="col-1">Role</div>
          <div className="col-4">Modify</div>
        </div>
      </div>
      <ThemeProvider theme={theme}>
        {currentPosts
          .filter(
            (user) =>
              user.firstname.toLowerCase().includes(search) ||
              user.lastname.toLowerCase().includes(search) ||
              user.email.toLowerCase().includes(search)
          )
          .map((item) => (
            <div key={item.id} className="container">
              <div className="row">
                <span className="col-1" style={{ paddingTop: 15 }}>
                  {item.firstname}
                </span>
                <span className="col-1" style={{ paddingTop: 15 }}>
                  {item.lastname}
                </span>
                <span className="col-4" style={{ paddingTop: 15 }}>
                  {item.email}
                </span>
                <span className="col-1" style={{ paddingTop: 15 }}>
                  {item.role}
                </span>
                <span className="col-4">
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ margin: 10 }}
                  >
                    update
                  </Button>
                  <Button
                    variant="contained"
                    style={{ margin: 10 }}
                    onClick={() => onDelete(item.id)}
                  >
                    delete
                  </Button>
                </span>
                <hr></hr>
              </div>
            </div>
          ))}
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}

export default GetUser;
