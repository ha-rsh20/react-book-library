import React, { useEffect } from "react";
import "../App.css";
import { useUserContext } from "./UserContext";

export default function Home() {
  const { userFirstName } = useUserContext();
  const { userId } = useUserContext();
  const { setUserFirstName } = useUserContext();
  const { setUserId } = useUserContext();

  useEffect(() => {
    if (localStorage.getItem("firstname")) {
      setUserFirstName(localStorage.getItem("firstname"));
    }
    if (localStorage.getItem("id")) {
      setUserId(localStorage.getItem("id"));
    }
  }, []);

  return (
    <div className="App">
      {userId} {userFirstName}
    </div>
  );
}
