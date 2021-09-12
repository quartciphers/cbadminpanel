import React,{useState} from "react";

let AdminContext = React.createContext();

export default AdminContext;


export const AdminProvider = ({children}) => {
     const CorsUrl="https://cba-cors.herokuapp.com/"
     const BaseUrl="https://cba-adminws-dev.herokuapp.com/"
    const [adminData] = useState(CorsUrl+BaseUrl)
    return <AdminContext.Provider value={adminData}>
        {children}
    </AdminContext.Provider>
}