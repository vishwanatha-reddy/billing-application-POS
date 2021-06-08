import React from 'react'

import './dash-comps.css'

const BillsList=(props)=> {
    const {bills}=props;
    return (
        <div className="card text-center border border-dark ">
            <div className="card-header">
                Total Bills 
            </div>
            <div className="card-body">
                     <h3>{bills.length}</h3> 
            </div>
        </div>
    )
}

export default BillsList 