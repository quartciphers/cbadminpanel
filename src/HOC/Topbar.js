/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import useToken from '../Utlis/userToken';
import {Link} from 'react-router-dom'

function Topbar() {

     
    const { token} = useToken();


    let logout =(e) =>{
     
        e.preventDefault();
        localStorage.clear();
        window.location.reload()
       

    }   
  
   
    return (
      
            <nav className="navbar navbar-expand navbar-dark bg-gradient-primary topbar mb-4 static-top shadow">

            <p className=" font-weight-bold text-white d-sm-none d-xs-none d-md-none d-lg-inline d-xl-inline pt-3"  >Christopher Badminton Academy</p>
 
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav ml-2 ">
    <div className="btn-group btn-group-sm text-white "> 
         


      
                       <Link to="/" className="nav-link btn btn-primary">
                        <i className="fas fa-home fa-2x text-white"></i>
                        <span className='p-2 font-weight-bold text-white'>Home</span>
                        </Link>
                        <Link to="/sector" class="nav-link btn btn-primary">
                        <i className="fas fa-fw fa-baseball-ball fa-2x text-white "></i>
                        <span className='p-2 font-weight-bold text-white'>Sector</span>
                        </Link>
                        <Link to="/user" class="nav-link btn btn-primary">
                        <i className="fas fa-fw fa-user-cog fa-2x text-white"></i>
                        <span className='p-2 font-weight-bold text-white'>Club</span>
                        </Link>
                        <Link to="/admin" class="nav-link btn btn-primary">
                        <i className="fas fa-fw fa-user-shield fa-2x text-white"></i>
                        <span className='p-2 font-weight-bold text-white'>Admin </span>
                        </Link>

        
    </div>
    
     
    </div>
   
  </div>

           
<ul className="navbar-nav ml-auto">
   

       
    <div className="topbar-divider d-none d-sm-block"></div>

   
    <li className="nav-item dropdown no-arrow ">
        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="mr-2 d-none d-lg-inline font-weight-bold large  text-capitalize mr-4">{token}</span>
            <i className="fas fa-user fa-2x"></i>
        </a>
       
        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown">
         
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal " onClick={logout}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
            </a>
        </div>
    </li>

</ul>

</nav>
      
    )
}

export default Topbar
