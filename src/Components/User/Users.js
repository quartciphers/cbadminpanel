/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect,useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import AdminContext from '../../Context/AdminContext';

import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';



function Users() {
    
   //initialize datatable
   $(document).ready(function () {
    $('#dataTable').DataTable();
});
const BaseUrl = useContext(AdminContext)

    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
 
    useEffect(() => {
     setLoading(true);
     fetch(BaseUrl+"api/v1/person")
       .then((res) => res.json())
       .then((data) => {
         setData(data["Persons"]);
         console.log(data);
       })
       .catch((err) => {
         console.log(err);
       })
       .finally(() => {
         setLoading(false);
       });
   }, []);

   if(loading){
       return   <div class="d-flex justify-content-center">
       <div class="spinner-border" role="status">
         <span class="sr-only">Loading...</span>
       </div>
     </div>
   }
    return (
        <>
         <div class="d-sm-flex align-items-center justify-content-between mb-4 ">
                <h1 class="h3 mb-0 text-gray-800">Club Patrons</h1>
                <Link to="/user-create" class=" d-sm-inline-block btn btn-sm btn-primary shadow-sm  mt-4"><i
                    class="fas fa-plus-square fa-sm text-white-50"></i> Add Member</Link>
            </div>

           
            <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Members List</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped " id="dataTable" width="100%" cellspacing="0">
                                    <thead className="table-dark">
                                        <tr>
                                        <th >ID </th>
                                            <th>Name</th>
                                            <th>Gender</th>
                                            <th>Address</th>
                                            <th>Club</th>
                                            <th>Sector</th>
                                            <th>SectorName</th>
                                            <th>JoinDate</th>
                                            <th>LeaveDate</th>
                                            <th>Phone</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                            
                                        </tr>
                                    </thead>
                                    
                                    <tbody className="font-weight-bold text-capitalize text-dark text-center">
                                        {
                                            data.map((user) => {
                                                return <tr>
                                                 <td>{user.Id}</td>
                                                <td>{user.Name}</td>
                                                <td className="text-center">{user.Gender === 'male' ?  'M'  : user.Gender ==='female' ? 'F' :user.Gender === 'other'? 'T' :'Not Specified'}</td>
                                                <td className="text-center">{user.Address ? user.Address:' - '}</td>
                                                <td>{user.Club}</td>
                                                <td>{user.Sector}</td>
                                                <td>{user.SectorName}</td>
                                                <td>{user.JoinDate}</td>
                                                <td>{user.LeaveDate ? user.LeaveDate:"Not-Yet"}</td>
                                                <td>{user.Phone}</td>
                                                <td >{user.Active ?<p className="badge badge-success btn-block">Active</p>:<p className="badge badge-danger btn-block">Inactive</p>}</td>                                        
                                                <td>
                                                    <Link to={"/user-edit/"+user.Id} className="btn btn-outline-info btn-block " title="View Record"><i class="fas fa-eye"></i></Link>
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

export default Users
