import React, { useEffect, useState } from "react";
import Login from "./Login";

function Protected(props) {
  const { Component } = props;
  const [log, setLog] = useState();

  useEffect(() => {
    let login = localStorage.getItem("loggedIn");
    if (login === "false") {
      setLog("false");
    } else {
      setLog("true");
    }
  });
  return <div>{log === "false" ? <Login /> : <Component />}</div>;
}

export default Protected;
