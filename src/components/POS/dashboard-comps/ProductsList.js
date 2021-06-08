import React from 'react'

import './dash-comps.css'

const ProductsList=(props)=> {
    const {products}=props;
    return (
        <div className="card text-center border border-dark">
            <div className="card-header">
                Total Products
            </div>
            <div className="card-body">
                <h3>{products.length}</h3> 
            </div>
        </div>
    )
}

export default ProductsList 