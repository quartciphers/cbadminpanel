/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect, useContext} from 'react'
import AdminContext from '../../Context/AdminContext';
import axios from 'axios';
function Card() {
    
    let Baseurl= useContext(AdminContext)

    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [batchdata,setBatchData]=useState([]);
    const [slotdata,setSlotData] = useState([]);
    useEffect(() => {
        setLoading(true);
        fetch(Baseurl+"api/v1/person")
          .then((res) => res.json())
          .then((data) => {
            setData(data["Stats"]);
            
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);
      useEffect(() => {
   
        axios.get(Baseurl+'api/v1/sector',{
     
          params:{
              type:"BATCH"
          },
          headers:{
            active:true
          }
        }).then(res=>{
            
            
            setBatchData(res.data["Sectors"])
      
          
        }).catch(error=>{
            console.log(error);
        }).finally(()=>{
          setLoading(false);
        })
      }, []);

       
  useEffect(() => {
   
    axios.get(Baseurl+'api/v1/sector',{

      params:{
          type:"SLOT"
      },
      headers:{
        active : true
      }
    }).then(res=>{
      
      setSlotData(res.data["Sectors"])
  
    }).catch(error=>{
        console.log(error);
    }).finally(()=>{
        setLoading(false)
    })
  }, []);
   
      if(loading){
        <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      }

  
   
   
    return (
        <>
        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-success shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                               Active Members</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">{data.ActivePerson}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-globe  fa-2x text-gray-500"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-danger shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                               InActive Members</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">{data.InActivePerson}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-users-slash fa-2x text-gray-500"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-info shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                               Total Members</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">{data.TotalPerson}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-user-friends fa-2x text-gray-500"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-secondary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                               Batches</div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">{batchdata.length}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-user-clock fa-2x text-gray-500"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-dark shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                               SLOTs </div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">{slotdata.length}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-user-tag fa-2x text-gray-500"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        </>
    )
}

export default Card
