import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./Firebase/FirebaseConfig";

export const UserContext = React.createContext();
export const UserContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({});

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser({});
      }
    });
    return () => unSubscribe();
  }, []);

  return <UserContext.Provider value={authUser}>{children}</UserContext.Provider>;
};
