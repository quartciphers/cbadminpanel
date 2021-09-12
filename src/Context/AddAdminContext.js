import React,{useState} from "react";

let AddAdminContext = React.createContext();

export default AddAdminContext;


export const AdminUser = ({children}) => {
    const [adminData, setAdminData] = useState([])
    return <AddAdminContext.Provider value={{adminData,setAdminData}}>
        {children}
    </AddAdminContext.Provider>
}