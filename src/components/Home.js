import React, { useEffect } from "react";
import "../App.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import Pagination from "./Pagination";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateUserFirstName, updateUserId } from "../state/slice/userSlice";
import MenuItem from "@mui/material/MenuItem";

function Home() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  let [cartId, setCartId] = useState();

  const userFName = useSelector((state) => state.users.firstname);
  const userSId = useSelector((state) => state.users.id);
  const dispatch = useDispatch();

  const [postPerPage, setPostPerPage] = useState("8");
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  let [currentPosts, setCurrentPosts] = useState([]);
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

  useEffect(() => {
    axios
      .get("http://localhost:4000/app/showAllBooks")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:4000/app/showAllBooks")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (localStorage.getItem("firstname")) {
      dispatch(updateUserFirstName(localStorage.getItem("firstname")));
    }
    if (localStorage.getItem("id")) {
      dispatch(updateUserId(localStorage.getItem("id")));
    }
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
          toast.error("Error in adding Book to Cart!", {
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
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="App" style={{ marginTop: 10 }}>
      <TextField
        id="filled-basic"
        label="Search"
        variant="filled"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <br></br>
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

      <Row style={{ margin: 30 }}>
        {currentPosts.map((book) => (
          <Col key={book.id} style={{ margin: 20 }}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={book.cover} loading="lazy" />
              <Card.Body>
                <Card.Title>{book.name}</Card.Title>
                <div style={{ height: "10rem", overflow: "hidden" }}>
                  <Card.Text>{book.description}</Card.Text>
                </div>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>${book.price}</ListGroup.Item>
              </ListGroup>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Pages: {book.page}</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Button
                  variant="primary"
                  onClick={() => toCart(userSId, book.id, book)}
                >
                  To cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <ToastContainer />
    </div>
  );
}

export default Home;
