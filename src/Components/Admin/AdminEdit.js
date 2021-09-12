import React, { useContext } from 'react'
import AdminContext from '../../Context/AdminContext';
import axios from 'axios';
import {useHistory} from "react-router-dom"
import AddAdminContext from '../../Context/AddAdminContext';
import useToken from '../../Utlis/userToken';



function AdminEdit(props) {
    const { token} = useToken();
    let AdminId = props.match.params.id;
    const BaseUrl = useContext(AdminContext)
    const data = useContext(AddAdminContext);
    const adminDetails = data.adminData
    let history = useHistory();

    let deleteAdmin = ()=>{

        axios.delete(BaseUrl+"api/v1/user",{
        headers:{
            "admin-username":token,
            "delete-username":AdminId
            
        }
    }).then((response)=>{
     console.log(response);
     history.push('/admin')
    
     
    }).catch((error)=>{
        console.log(error);
    })


   

    }

    return (
       
        <div className="container ">
            <h1 className=" h1 text-muted">Admin Management</h1>
             {
              
              adminDetails.map((user) => {
                   
                  if (user.Username === AdminId){
                      
                      return (
                      <>
                      <ul className="list-group mb-5 text-center text-dark font-weight-bold text-uppercase">
                          
                         <li className="list-group-item">Username: {user.Username}</li>
                         <li className="list-group-item">Admin Acess :{user.AdminAccess?<span className="badge badge-success"> Yes </span>:<span className="badge badge-danger"> No </span>}</li>
                         
                      </ul>
                     
                  
                       
                     </>
                     
                        )
                  }
                 return true 
              })
             
               
             }
              <button className="btn btn-outline-danger btn-block" onClick={deleteAdmin} >Delete</button>
            
        </div>
    )
}

export default AdminEdit
