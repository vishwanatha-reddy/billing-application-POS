import React from 'react'

import './dash-comps.css'

const CustomersList=(props)=> {
    const{customers}=props;
    return (
          <div className="card text-center border border-dark">
            <div className="card-header">
                Total Customers
            </div>
            <div className="card-body">
                     <h3>{customers.length}</h3> 
            </div>
        </div>
    )
}

export default CustomersList 