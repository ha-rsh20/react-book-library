import { createContext, useContext, useState } from "react";

export const UserContext = createContext("");

export const AppWrapper = ({ children }) => {
  const [userId, setUserId] = useState();
  const [userFirstName, setUserFirstName] = useState("user");
  const [userLastName, setUserLastName] = useState("user");
  return (
    <div>
      <UserContext.Provider
        value={{
          userFirstName,
          setUserFirstName,
          userLastName,
          setUserLastName,
          userId,
          setUserId,
        }}
      >
        {children}
      </UserContext.Provider>
    </div>
  );
};

export const useUserContext = () => useContext(UserContext);
