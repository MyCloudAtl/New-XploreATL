// import React, { createContext, useState, useEffect } from 'react'
// import axios from 'axios'

// import React from "react"
// const UserContext = React.createContext()
// export default UserContext

import React, { createContext, useState } from 'react'
const UserContext = createContext()
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserContext


// export const UserContext = createContext()
// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   useEffect(() => {
//     const fetchUser = async () => {
//       const response = await axios.get('http://localhost:3003/users')
//       setUser(response.data)
//     }
//     fetchUser()
//   }, [])
//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   )
// }