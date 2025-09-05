import React, { createContext, useEffect, useState } from "react";
import { GetlocalStorage, SetlocalStorage } from "../utils/localstorage";

export const LogContext = createContext();

const AuthContext = ({ children }) => {
const data=GetlocalStorage()
console.log(data)
const [products, setProducts] = useState(data.products)
const [users, setUsers] = useState(data.users || [])
const [currentUser, setCurrentUser] = useState(data.currentUser)
console.log(currentUser)

useEffect(() => {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("Users", JSON.stringify(users));
}, [users,products])

useEffect(() => {
  console.log(`Updating CurrentUser`)
  localStorage.setItem("CurrentUser", JSON.stringify(currentUser));
  console.log(currentUser)
}, [currentUser])

if (!products || !Array.isArray(users)) {
  SetlocalStorage()
  console.log(`LocalStorage Was Deleted Updating Now`)
}

  return (
    <LogContext.Provider value={{products,users,currentUser,setUsers,setProducts,setCurrentUser}}>
      {children}
    </LogContext.Provider>
  );
};

export default AuthContext;
