import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link,Route, withRouter,Switch} from 'react-router-dom';

import BillsList from './dashboard-comps/BillsList';
import CustomersList from './dashboard-comps/CustomerList';
import SalesChart from './dashboard-comps/SalesChart';
import ProductsList from './dashboard-comps/ProductsList';
import TotalSales from './dashboard-comps/TotalSales'
import {startCustomerList} from '../../actions/customersAction';
import {startProductsList} from '../../actions/productsAction';
import {startBillsList} from '../../actions/billAction';
import './dashboard-comps/dash-comps.css'


const Dashboard=(props)=> {
    const {userLoggedIn}=props;

    const dispatch=useDispatch();

    const {userInfo,customers,products,cartItems,bills}=useSelector((store)=>{
        return store;
    })

    console.log(customers, bills,'bills n customers from dashboard');

    useEffect(()=>{
        dispatch(startCustomerList());
        dispatch(startProductsList());
        dispatch(startBillsList());
    },[]);


    return (
        <section>
            <div className="container py-5">
                <div className="row">
                {/* <div className="col-sm-4 col-md-8 col-lg-8 col-xl-8 text-center offset-sm-6 offset-md-4 offset-lg-4 offset-xl-4"> */}
                  <div className=" offset-md-2 col-md-3 mt-3  cardPosition">
                      <TotalSales bills={bills} />
                  </div>
                  {/* <MonthlyRevenue bills={bills}className="col-md-3"/> */}
                  <div className=" offset-md-2 col-md-3 mt-3  cardPosition">
                      <CustomersList customers={customers} />
                  </div>
                </div>
                <div className="row">
                    <div className=" offset-md-2 col-md-3 mt-3  cardPosition">
                      <ProductsList products={products} />
                  </div>
                  <div className=" offset-md-2 col-md-3 mt-3  cardPosition">
                      <BillsList bills={bills} />
                  </div>
                </div>
                <div className="row">
                    <div className="col-md-8 d-none d-sm-block offset-md-2 mt-4 border border-dark bg-light">
                        <SalesChart/>
                    </div>
                </div>
        </div>
        </section>


    )
}

export default withRouter(Dashboard)
