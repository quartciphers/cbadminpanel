/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect,useContext} from 'react'
import { Link } from 'react-router-dom'
import AdminContext from '../../Context/AdminContext';
import AddAdminContext from '../../Context/AddAdminContext';

import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';


function Admin() {

    const BaseUrl = useContext(AdminContext)

    $(document).ready(function () {
        $('#dataTable').DataTable();
    });
 

    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const AdminData = useContext(AddAdminContext);


 
    useEffect(() => {
     setLoading(true);
     fetch(BaseUrl+"api/v1/user")
       .then((res) => res.json())
       .then((data) => {
         setData(data["Users"]);
       })
       .catch((err) => {
         console.log(err);
       })
       .finally(() => {
         setLoading(false);
       });
   }, []);
      if(loading){
          return ( <div class="d-flex justify-content-center align-items-center">
          <div class="spinner-border fs-3" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div> )
      }
      let  handleClick =() =>{
        console.log(data);
        AdminData.setAdminData([...data])
        console.log(AdminData);
      }

    return (
        <>
         <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Admin Management</h1>
                <Link to="/admin-create" class=" d-sm-inline-block btn btn-sm btn-primary shadow-sm mt-4"><i
                    class="fas fa-plus-square fa-sm text-white-50"></i> Add Admin</Link>
            </div>

            
<div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Admin Users List</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead className="table-dark">
                                        <tr>
                                           
                                            <th>UserName</th>
                                            
                                            <th>Admin Access</th>
                                            <th>Action</th>
                                            
                                        </tr>
                                    </thead>
                                   
                                    <tbody className="font-weight-bold text-dark text-center">
                                        {
                                            data.map((user) => {
                                                return <tr>
                                                <td>{user.Username}</td>
                                                <td>{user.AdminAccess ?<span className='badge badge-success'>YES</span>:<span className='badge badge-danger'>NO</span>}</td>                          
                                                <td>
                                                    <Link className="btn btn-outline-info btn-block" title="View" to={"/admin-edit/"+user.Username}  onClick={handleClick}><i class="fas fa-eye"></i></Link>
                                                </td>
                                            </tr>
                                        
                                        
                                        
                                        })

                                       
                                    
                                        }
                                   
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
        </>
    )
}

export default Admin
