
import Topbar from "./HOC/Topbar";
import Dashboard from './Components/Dashboard/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Users from './Components/User/Users';
import Usercreate from './Components/User/Usercreate';
import UserEdit from './Components/User/UserEdit';
import { AdminProvider } from "./Context/AdminContext";
import Admin from './Components/Admin/Admin';
import Admincreate from './Components/Admin/AdminCreate';
import AdminEdit from './Components/Admin/AdminEdit';
import Sector from './Components/Sector/Sector';
import AddBatch from "./Components/Sector/Batch/AddBatch";
import AddSlot from "./Components/Sector/Slot/AddSlot";
import {AdminUser} from "./Context/AddAdminContext";
import NotFound from "./Components/Other/NotFound";
import Login from "./Components/Login/Login";
import useToken from "./Utlis/userToken";




function App() {
  
  const { token, setToken } = useToken();
 
  
  if(!token) {
    
    return (
    <Login setToken={setToken} />
   
   )
    
  }
  


  return (



    
    <AdminProvider>
      <AdminUser>
      <Router>  
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar></Topbar>
          
            <div class="container-fluid">
              <Switch>
              
              <Route path="/" component={Dashboard} exact={true} />
              <Route path="/user" component={Users} exact={true} />
              <Route path="/user-create" component={Usercreate} exact={true} />
              <Route path="/user-edit/:id" component={UserEdit} exact={true} />
              <Route path="/admin" component={Admin} exact={true} />
              <Route path="/admin-create" component={Admincreate} exact={true} />
              <Route path="/admin-edit/:id" component={AdminEdit} exact={true} />
              <Route path="/sector" component={Sector} exact={true}/>
              <Route path="/manage-batch" component={AddBatch} exact={true}/>
              <Route path="/manage-slot" component={AddSlot} exact={true}/>
              <Route component={NotFound} exact={true}/>
              
              </Switch>
            </div>
          </div>
        </div>
        
      </div>
      
    </Router>
    </AdminUser>
    </AdminProvider>
  );
}

export default App;
