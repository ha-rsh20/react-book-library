import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Button, TextField, ThemeProvider } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "../mui_style";
import Pagination from "./Pagination";
import { useUserContext } from "./UserContext";

function GetBook() {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const dataFetch = useRef(false);
  const [page, setPage] = useState(1);
  const [cartBook, setCartBook] = useState();

  const { userId } = useUserContext();
  const { userFirstName } = useUserContext();
  const { setUserFirstName } = useUserContext();
  const { setUserId } = useUserContext();

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
      .delete("http://localhost:4000/app/deleteBook/" + id)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Book deleted successfully!", {
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
        toast.error("Error in deleting book!", {
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

  const toCart = (uid, bid, book) => {
    console.log(uid + " " + bid + " " + book);
    axios
      .post("http://localhost:4000/app/addToCart/" + uid + "/" + bid, book)
      .then((res) => {
        console.log(res);
        toast.success("Book added to cart!", {
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
  };

  useEffect(() => {
    if (localStorage.getItem("firstname")) {
      setUserFirstName(localStorage.getItem("firstname"));
    }
    if (localStorage.getItem("id")) {
      setUserId(localStorage.getItem("id"));
    }
    axios
      .get("http://localhost:4000/app/showAllBooks")
      .then((res) => {
        setUser(res.data);
        console.log(user);
        toast.success("Success on fetching book details!", {
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
        toast.error("Error in fetching book details!", {
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
    if (dataFetch.current) {
      return;
    }
    dataFetch.current = true;
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
              console.log(user.filter((book) => book.name.includes(search)));
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
      <ThemeProvider theme={theme}>
        {currentPosts
          .filter((book) => book.name.toLowerCase().includes(search))
          .map((item) => (
            <div
              key={item.id}
              style={{
                marginTop: 10,
                padding: 5,
                border: "2px solid black",
                borderRadius: 5,
              }}
            >
              <h3>{item.name}</h3>
              <span>{item.description}</span>
              <p>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ margin: 10 }}
                  onClick={() => toCart(userId, item.id, item)}
                >
                  to cart
                </Button>
                <Button
                  variant="contained"
                  style={{ margin: 10 }}
                  onClick={() => onDelete(item.id)}
                >
                  delete
                </Button>
              </p>
            </div>
          ))}
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}

export default GetBook;
