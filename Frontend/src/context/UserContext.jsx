import React, { createContext, useState } from 'react';

export const userContext=createContext();

const UserContext = ({children}) => {
    const [user,setUser]=useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        }
    });

  return (
    <div>
        <userContext.Provider value={{user,setUser}}>
            {children}
        </userContext.Provider>
    </div>
  )
}

export default UserContext