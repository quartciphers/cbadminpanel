import React,{useState,useContext} from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import AdminContext from '../../../Context/AdminContext';
import useToken from '../../../Utlis/userToken';
function AddSlot(){
    const { token} = useToken();
    const [name, setName] = useState("");
    const [fees, setFees] = useState("");
    let history = useHistory();
    const BaseUrl = useContext(AdminContext)
  let handleSubmit = ( Slotname , Slotfees)=>{

    axios({
        method: 'post',
        url: BaseUrl+'api/v1/sector',
        data: {
           Name : Slotname,
           Fees : Slotfees
        },
        params: {type: 'SLOT'},
        headers :{'admin-username': token}
      }).then(function (response) {
            console.log(response);
            history.push("/sector")   
          
          })
          .catch(function (error) {
           alert(error);
            
          });
     

  }

    return(

        <div className="container">
            <h1>Add Slot</h1>
        
            <div className="row">
            
                <div className="col-lg-6">
                    <label className='text-dark'>Name</label>
                    <input type="text" name="Name" className="form-control w-auto" value={name} onChange={(e) => setName(e.target.value)}  required  />
                </div>
                
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <label>Fees</label>
                    <input type="number" name="Fees"  className="form-control w-auto" value={fees} onChange={(e) => setFees(e.target.value)} required />  
                </div>
             
           
           
        </div>
        <div className="row mt-4 ">
                <div className="col-lg-12">
                    <input className="btn btn-success" type="submit" onClick={handleSubmit.bind(this,name,fees)} />
                </div>
            </div>
        </div>

    )


}



export default AddSlot