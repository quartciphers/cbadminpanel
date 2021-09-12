/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import AdminContext from '../../../Context/AdminContext';
import useToken from '../../../Utlis/userToken';

function Slot(){
  const { token} = useToken();
  const [data,setData] = useState([]);
  const [loading,setLoading]=useState(false);
  let history = useHistory();
  let Baseurl= useContext(AdminContext)
  let deleteSlot = (slotname) =>{
    axios.delete(Baseurl+'api/v1/sector',{
      headers:{'admin-username': token,
       'name' : slotname
                    
    },
    params:{
      type :'SLOT'
    }

    
      
    }).then((res)=>{
      
      
     
      history.push('/')
     
    }).catch((error)=>{
      console.log(error);
    })

  

    

  }
  
  
  
  
  
  useEffect(() => {
   
    axios.get(Baseurl+'api/v1/sector',{

      params:{
          type:"SLOT"
      },
      headers:{
        active : true
      }
    }).then(res=>{
      
      setData(res.data["Sectors"])
  
    }).catch(error=>{
        console.log(error);
    }).finally(()=>{
        setLoading(false)
    })
  }, []);
   
  if(loading){
      return <div class="d-flex align-items-center">
      <strong>Loading...</strong>
      <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
    </div>
  }
 
 
  
   

    return (
        <div className="Container mt-4">

            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Slot Management</h1>
                <Link to="/manage-slot" class="d-none d-sm-inline-block btn btn-sm btn-outline-success shadow-sm text-dark"><i
                    class="fas fa-cog fa-sm "></i> Manage Slot</Link>
            </div>
                
                        {data.map(slot=>{

                            return(                      
                                <ul className="list-group mt-2 font-weight-bold text-dark text-capitalize">
                                              <li className="list-group-item ">Batch Name : {slot.Name}</li>
                                              <li className="list-group-item">Fees : ₹{slot.Fees}</li>
                                              <li className="list-group-item ">Status : {slot.Active?<span className="badge badge-success">Active</span>:<span className="badge badge-danger">Inactive</span>}</li>
                                              <li className="list-group-item btn btn-outline-danger btn-block "title="Delete" onClick={deleteSlot.bind(this,slot.Name)}> <i class="fas fa-trash"></i></li>
                                       
                              </ul>)
                              
                              
                              })}    
        </div>
    )

}



export default Slot