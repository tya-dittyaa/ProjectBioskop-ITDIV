import { createContext, useContext, useState } from "react";

const UserContext = createContext({
  userLog: {
    id: "",
    email: "",
    password: "",
    name: "",
  },
  setUserLog: (newUser) => {}
});

export const UserProvider = ({children})=>{
    const [userLog,setUserLog] = useState({
        id: "",
        email: "",
        password: "",
        name: ""
    });

    const setUserData = (newUser)=>{
        setUserLog(newUser);
    }

    return (
        <UserContext.Provider value={{userLog,setUserLog:setUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = ()=>{
    return useContext(UserContext)
}