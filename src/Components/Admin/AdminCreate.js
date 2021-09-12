import React, {  useContext, useState } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import AdminContext from '../../Context/AdminContext';
import useToken from '../../Utlis/userToken';



import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import TextField from '@material-ui/core/TextField';


function Admincreate() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [adminaccess, setAdminaccess] = useState("");
    const { token} = useToken();
    const BaseUrl = useContext(AdminContext)
    let history = useHistory();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);


    let handleSubmit = () => {
    
        axios({
            method: 'post',
            url: BaseUrl+'api/v1/user',
            data: {
                Username: name,
                Password: password,
                AdminAccess:adminaccess
            },
            headers: {'admin-username': token}
          }).then(function (response) {
                console.log(response);
               
              })
              .catch(function (error) {
                console.log(error);
               
              });
        history.push("/")
    }
    return (


        <div className="container">
            <h1>Admin  Form</h1>
        
            <div className="row">
            
                <div className="col-lg-6">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required  />
                </div>
                
            </div>
            <div className="row">
                <div className="col-lg-6">
                <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            InputProps={{ 
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
                </div>
                <div className="col-lg-3">
                    <label>Admin Access</label>
                    <select  name="adminaccess" value={adminaccess} onChange={(e) => setAdminaccess(e.target.value)} className="form-control" required  >
                    <option value="">-SELECT-</option>  
                      <option value="true">Yes</option>   
                     <option value="false">No</option>
                    </select>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg-12">
                    <input className="btn btn-primary" type="submit" onClick={handleSubmit} />
                </div>
            </div>
           
        </div>
        
        
    )

}

export default Admincreate
