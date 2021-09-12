import React,{useState,useContext} from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import AdminContext from '../../../Context/AdminContext';
import useToken from '../../../Utlis/userToken';
function AddBatch(){
    const { token} = useToken();
    const [name, setName] = useState("");
    const [fees, setFees] = useState("");
    let history = useHistory();
    const BaseUrl = useContext(AdminContext)
  let handleSubmit = ()=>{

    axios({
        method: 'post',
        url: BaseUrl+'api/v1/sector',
        data: {
           Name : name,
           Fees : fees
        },
        params: {'type': 'BATCH'},
        headers :{'admin-username': token}
      }).then(function (response) {
        history.push("/sector")  
           
          })
          .catch(function (error) {
            alert(error) 
            
          });
     

  }

    return(

        <div className="container">
            <h1>Add Batch</h1>
        
            <div className="row">
            
                <div className="col-lg-6">
                    <label>Name</label>
                    <input type="text" name="Name" className="form-control w-auto" value={name} onChange={(e) => setName(e.target.value)}  required  />
                </div>
                
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <label>Fees</label>
                    <input type="number" name="Fees" className="form-control w-auto" value={fees} onChange={(e) => setFees(e.target.value)}  required />  
                </div>
             
           
        </div>
       
       <div className='row'>
       <div className="row mt-3 ml-5">
                <div className="col-lg-6">
                    <input className="btn btn-warning w-auto" type="submit" onClick={handleSubmit} />
                </div>
            </div>
       </div>
        </div>

    )


}



export default AddBatch