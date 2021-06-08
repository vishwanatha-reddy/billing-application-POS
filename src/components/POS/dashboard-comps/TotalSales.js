import React from 'react'

import './dash-comps.css'

const TotalSales=(props)=> {
    const {bills}=props;
    let salesVolume=0;

    //calculating total of all bills
    bills.forEach((bill)=>salesVolume+=bill.total);

    return (
        <div className="card text-center border border-dark">
            <div className="card-header">
                Total Sales
            </div>
            <div className="card-body">
                     <h3>{salesVolume}</h3> 
            </div>
        </div>
        )
}

export default TotalSales 
