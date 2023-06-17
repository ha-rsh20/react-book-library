import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Button, TextField, ThemeProvider } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "../mui_style";
import Pagination from "./Pagination";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router";
import {
  updateBookId,
  updateBookName,
  updateBookPage,
  updateBookPrice,
  updateBookDescription,
} from "../state/slice/bookSlice";
import {
  updateUserFirstName,
  updateUserId,
  updateUserRole,
} from "../state/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import MenuItem from "@mui/material/MenuItem";

function GetBook(props) {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  let [cartId, setCartId] = useState();

  let userSId = useSelector((state) => state.users.id);
  let userRole = useSelector((state) => state.users.role);
  const dispatch = useDispatch();

  const [postPerPage, setPostPerPage] = useState("8");
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  let [currentPosts, setCurrentPosts] = useState();
  const navigate = useNavigate();
  currentPosts = books
    .filter(
      (book) =>
        book.name.toLowerCase().includes(search) ||
        book.description.toLowerCase().includes(search)
    )
    .slice(indexOfFirstPost, indexOfLastPost);

  const postPerPageA = [
    {
      value: 8,
      label: "8",
    },
    {
      value: 16,
      label: "16",
    },
    {
      value: 24,
      label: "24",
    },
  ];

  const handlePostPerPage = (e) => {
    setPostPerPage(e.target.value);
  };

  const paginate = (pageNumber) => {
    setPage(pageNumber);
  };

  const onDelete = (id) => {
    axios
      .delete("http://localhost:4000/app/deleteBook/" + id)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Book removed successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setBooks(books.filter((book) => book.id !== id));
          setCurrentPosts(currentPosts.filter((book) => book.id !== id));
        }
      })
      .catch((err) => {
        toast.error("Error in removing book!", {
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

  const toUpdate = (book) => {
    dispatch(updateBookId(book.id));
    dispatch(updateBookName(book.name));
    dispatch(updateBookPage(book.page));
    dispatch(updateBookPrice(book.price));
    dispatch(updateBookDescription(book.description));
    navigate("/updateBook");
  };

  useEffect(() => {
    if (localStorage.getItem("firstname")) {
      dispatch(updateUserFirstName(localStorage.getItem("firstname")));
    }
    if (localStorage.getItem("id")) {
      userSId = localStorage.getItem("id");
      dispatch(updateUserId(localStorage.getItem("id")));
    }
    if (localStorage.getItem("role")) {
      userRole = localStorage.getItem("role");
      dispatch(updateUserRole(localStorage.getItem("role")));
    }
    axios
      .get(
        userRole === "Admin" || props.path === "Home"
          ? "http://localhost:4000/app/showAllBooks"
          : "http://localhost:4000/app/showBooksBySeller/" + userSId
      )
      .then((res) => {
        setBooks(res.data);
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
  }, []);

  const toCart = async (uid, bid, book) => {
    if (userSId !== undefined) {
      await axios
        .get("http://localhost:4000/app/getCartId")
        .then((res) => {
          cartId = res.data.cid;
        })
        .catch((err) => {
          console.log(err);
        });

      let cartBook = {
        name: book.name,
        description: book.description,
        page: book.page,
        price: book.price,
        cid: cartId + 1,
      };

      axios
        .post(
          "http://localhost:4000/app/addToCart/" + uid + "/" + bid,
          cartBook
        )
        .then((res) => {
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
          toast.error(
            uid === ""
              ? "Login to add book to cart"
              : "Error in adding Book to Cart!",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
        });
    } else {
      navigate("/login");
    }
  };

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
      <div style={{ margin: 10, display: "flex", justifyContent: "center" }}>
        <TextField
          id="filled-select-currency"
          select
          label="Select"
          defaultValue={postPerPage}
          helperText="Books"
          variant="filled"
          onChange={handlePostPerPage}
        >
          {postPerPageA.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Pagination
          postPerPage={postPerPage}
          totalPosts={books.length}
          paginate={paginate}
          currentPage={page}
        />
      </div>
      <ThemeProvider theme={theme}>
        <Row style={{ margin: 30 }}>
          {currentPosts.map((item) => (
            <Col key={item.id} style={{ margin: 20 }}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={item.cover} loading="lazy" />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <div style={{ height: "10rem", overflow: "hidden" }}>
                    <Card.Text>{item.description}</Card.Text>
                  </div>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Price: ${item.price}</ListGroup.Item>
                </ListGroup>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Pages: {item.page}</ListGroup.Item>
                </ListGroup>

                {props.path === "Home" ? (
                  <Card.Body
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => toCart(userSId, item.id, item)}
                    >
                      To cart
                    </Button>
                  </Card.Body>
                ) : (
                  <Card.Body
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      style={{ margin: 10 }}
                      onClick={() => toUpdate(item)}
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
                  </Card.Body>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}

export default GetBook;
