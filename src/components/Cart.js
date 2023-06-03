import React, { useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import axios from "axios";
import { Button, TextField, ThemeProvider } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "../mui_style";
import Pagination from "./Pagination";

export default function Cart() {
  const [cartBook, setCartBook] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { userId } = useUserContext();
  const { userFirstName } = useUserContext();
  const { setUserFirstName } = useUserContext();
  const { setUserId } = useUserContext();
  let id;
  const postPerPage = 5;
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const paginate = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    if (localStorage.getItem("firstname")) {
      setUserFirstName(localStorage.getItem("firstname"));
    }
    if (localStorage.getItem("id")) {
      id = localStorage.getItem("id");
      setUserId(localStorage.getItem("id"));
    }
    axios
      .get("http://localhost:4000/app/showCart/" + id)
      .then((res) => {
        setCartBook(res.data);
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
          //currentPosts = currentPosts.filter((book) => book.id !== id);
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

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: 20 }}>
        <div className="container" style={{ marginBottom: 20 }}>
          <div className="row">
            <div className="col-2">Name</div>
            <div className="col-1">Price</div>
            <div className="col-8">Description</div>
          </div>
        </div>
        {cartBook.map((item) => (
          <div key={item.id} className="container">
            <div className="row">
              <span className="col-2" style={{ paddingTop: 15 }}>
                {item.name}
              </span>
              <span className="col-1" style={{ paddingTop: 15 }}>
                {item.price}
              </span>
              <span className="col-7" style={{ paddingTop: 15 }}>
                {item.description}
              </span>
              <span className="col-2">
                <Button
                  variant="contained"
                  style={{ margin: 10 }}
                  onClick={() => console.log(item.id)}
                >
                  delete
                </Button>
              </span>
              <hr></hr>
            </div>
          </div>
        ))}
      </div>
    </ThemeProvider>
  );
}
