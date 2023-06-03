import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Login from "./Login";

function Protected(props) {
  const navigate = useNavigate();
  const { Component } = props;
  const [log, setLog] = useState();

  useEffect(() => {
    let login = localStorage.getItem("login");
    //console.log("Protected login:", login);
    if (login === "false") {
      setLog("false");
    } else {
      setLog("true");
    }
  });
  return <div>{log === "false" ? <Login /> : <Component />}</div>;
}

export default Protected;
