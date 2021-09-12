import React from 'react'
import Batch from   './Batch/Batch'
import Slot from './Slot/Slot';


function Sector(){
    return (
        <div className="Container mt-2">
         <h1 className="h2 text-dark">Sector Management</h1>
        
        <div className="container mt-5">
        <Batch/>
        <Slot/>
        </div>
       
        </div>
    )
}

export default Sector;