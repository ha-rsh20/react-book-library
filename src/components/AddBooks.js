import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyStyle.css";

export default function AddBooks() {
  const Navigate = useNavigate();

  function toHome() {
    //alert("You want to home page!");
    //let name = prompt("What is your name?");
    //console.log(name);
    //console.log(window);
    let confirm = window.confirm("Do you want to navigate to home?");
    if (confirm) {
      Navigate("/");
    }
  }
  return (
    <div>
      <div style={{ padding: 10 }}>AddBooks</div>
      <button onClick={toHome} className="btn">
        Navigate to home!
      </button>
    </div>
  );
}
