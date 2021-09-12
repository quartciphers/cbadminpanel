import React,{useState} from "react";

let UserContext = React.createContext();

export default UserContext;


export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState([])
    return <UserContext.Provider value={{userData,setUserData}}>
        {children}
    </UserContext.Provider>
}