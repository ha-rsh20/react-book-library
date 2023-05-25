import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GetBooks() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    console.log("in the getbooks!");
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setUser(res.data);
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
    <div style={{ padding: 10 }}>
      {user.map((item) => (
        <div
          key={item.id}
          style={{
            margin: 10,
            padding: 5,
            border: "2px solid black",
            borderRadius: 5,
          }}
        >
          <h3>{item.title}</h3>
          <span>{item.body}</span>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}

export default GetBooks;
