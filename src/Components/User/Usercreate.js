import React, { useState,useContext} from 'react'
import AdminContext from '../../Context/AdminContext';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import useToken from '../../Utlis/userToken';

function Usercreate() {
    const { token} = useToken();
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [sector, setSector] = useState("");
    const [phone, setPhone] = useState("");
    const [club, setclub] = useState("");
    const [address, setaddress] = useState("");
    const [sectorname, setsectorname] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [selectsector , setselectsector] = useState([]);
    const BaseUrl = useContext(AdminContext)
    let history = useHistory();
    let  slotOrBatch;


  
    let sectorSwitch = (e) =>{
        console.log(e.target.value);
        setSector(e.target.value);
         slotOrBatch = e.target.value;
         axios.get(BaseUrl+'api/v1/sector',{
     
            params:{
                type:slotOrBatch
            },
            headers:{
              active:true
            }
          }).then(res=>{
            
            setselectsector(res.data['Sectors'])
                   console.log(res);
            
          }).catch(error=>{
              console.log(error);
          }).finally(()=>{
           
          })
  

       
    }

   
   
        
     

      

    let handleSubmit = (e) => {

        e.preventDefault();
       
        console.log(
            name,gender,sector,phone
        );
       
        axios({
            method: 'post',
            url: BaseUrl+'api/v1/person',
            data: {
                Name: name,
                Gender: gender,
                Club: club,
                Address :address,
                Sector:sector,
                SectorName:sectorname,
                Phone:phone
            },
            headers: {'admin-username': token}
          }).then(function (response) {
              
                history.push('/user');
                setButtonDisabled(true)
                
              })
              .catch(function (error) {
                console.log(error);
                setButtonDisabled(false)
               
              });
             
       
    }

 
    return (


        <div className="container">
            <h1>New Patron Form</h1>
           <form data-toggle="validator" onSubmit={handleSubmit}>
            <div className="row">
            
                <div className="col-lg-6 form-group">
                    <label className="required text-dark">Name</label>
                    <input type="text" name="name"  value={name} onChange={(e) => setName(e.target.value)} className="form-control w-auto" required  />
                </div>
                <div className="col-lg-6 form-group">
                    <label className="required text-dark">Gender</label>
                    <select type="text" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="form-control w-auto text-dark" required >
                        <option value="">SELECT-GENDER</option>
                       <option value="male">MALE</option>
                       <option value="female">FEMALE</option>
                       <option value="other">OTHER</option>
                    </select>  
                </div>
            </div>
            <div className="row">
            
            <div className="col-lg-6 form-group">
                <label className="">Address</label>
                <textarea  name="address"  value={address} onChange={(e) => setaddress(e.target.value)} className="form-control w-auto" maxLength="50"   />
            </div>
            <div className="col-lg-6 form-group">
                <label className="required text-dark">Club</label>
                <select type="text" name="club" value={club} onChange={(e) => {setclub(e.target.value)}} className="form-control w-auto text-dark" required >
                    <option value="">SELECT-CLUB</option>
                   <option value="SCBC">SCBC</option>
                   <option value="KSMA">KSMA</option>
   
                </select>  
                
            </div>
        </div>
            <div className="row">
                <div className="col-lg-6 form-group">
                    <label className="required">Sector</label>
                    <select name="sector" value={sector} onChange={sectorSwitch} className="form-control w-auto" required >
                        <option value="">SELECT-SECTOR</option>
                       <option value="BATCH">BATCH</option>
                       <option value="SLOT">SLOT</option>
                     </select>  
                         
                </div>
                <div className="col-lg-6 form-group">
                    
                <label className="required text-dark">Sector Name</label>
                         <select type="text" name="sectorName" value={sectorname} onChange={(e) => setsectorname(e.target.value)} className="form-control w-auto text-dark" required >
                         <option value="">SELECT-SECTOR-NAME</option>
                         {selectsector && selectsector.map(sector =>{
                            return <option value={sector.Name}>{sector.Name}</option>
                         })}
                         </select>  
                         
                </div>
                <div className="col-lg-3 form-group">
                    <label className="required text-dark">Phone</label>
                    <input type="text" name="phone" value={phone} maxLength='10' onChange={(e) => setPhone(e.target.value)} className="form-control w-auto" required  />
               
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg-12 form-group">
                    <input className="btn btn-primary" type="submit"  disabled={buttonDisabled} />
                </div>
            </div>
            </form>
        </div>
        
        
    )

}

export default Usercreate
