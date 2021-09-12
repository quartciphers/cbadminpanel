/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import AdminContext from '../../../Context/AdminContext';
import useToken from '../../../Utlis/userToken';

function Batch(){
  let Baseurl= useContext(AdminContext);
  const { token} = useToken();
  const [data,setData] = useState([]);
  const [loading,setLoading]=useState(false);
   let history = useHistory()
  let deleteBatch = (batchname) =>{
    axios.delete(Baseurl+'api/v1/sector',{
      headers:{'admin-username': token,
       'name' : batchname
                    
    },
      params:{type: 'BATCH'},
      
    }).then((res)=>{
      
      console.log(res);
      history.push('/')
     
    }).catch((error)=>{
      console.log(error);
    })

    

  }
   

  useEffect(() => {
   
    axios.get(Baseurl+'api/v1/sector',{
 
      params:{
          type:"BATCH"
      },
      headers:{
        active:true
      }
    }).then(res=>{
      
      setData(res.data["Sectors"])
  
      
    }).catch(error=>{
        console.log(error);
    }).finally(()=>{
      setLoading(false);
    })
  }, []);
   
  if(loading){
    return <div class="d-flex align-items-center">
    <strong>Loading...</strong>
    <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
  </div>
  }
 
 
  
   

    return (
        <div className="Container ">
             
          
             <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Batch Management</h1>
                <Link to="/manage-batch" class="d-none d-sm-inline-block btn btn-sm btn-outline-warning text-dark shadow-sm"><i
                    class="fas fa-cog fa-sm w-auto"></i> Manage Batch</Link>
            </div>
                
                        {data.map(batch=>{

                            return(                      
                                <ul className="list-group mt-2 text-dark font-weight-bold text-capitalize">
                                              <li className="list-group-item">Batch Name: {batch.Name}</li>
                                              <li className="list-group-item">Fees : ₹{batch.Fees}</li>
                                              <li className="list-group-item ">Status : {batch.Active?<span className="badge badge-success">Active</span>:<span className="badge badge-danger">Inactive</span>}</li>
                                              <li className="list-group-item btn btn-outline-danger btn-block "title="Delete" onClick={deleteBatch.bind(this,batch.Name)} > <i class="fas fa-trash"></i></li>
                              
                              </ul>)
                              
                              
                              })}    
        </div>
    )

}

export default Batch