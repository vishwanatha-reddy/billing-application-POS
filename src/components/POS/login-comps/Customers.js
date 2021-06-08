import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator';
import swal from 'sweetalert';

import '../dashboard-comps/dash-comps.css';
import { asyncDeleteCustomer, startCustomerList } from '../../../actions/customersAction'
import { startCreateCustomer } from '../../../actions/customersAction'
import CustomerItem from '../../../edit-form/CustomerItem';
import { startProductsList } from '../../../actions/productsAction';
import { startBillsList } from '../../../actions/billAction';

const Customers = (props) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [nameValidate, setNameValidate] = useState(false);
    const [phoneValidate, setPhoneValidate] = useState(false);
    const [emailValidate, setEmailValidate] = useState(false);

    const dispatch = useDispatch();

    const customersData = useSelector((store) => {
        return store.customers;
    })

    console.log(customersData);

    useEffect(() => {
        dispatch(startCustomerList());
        dispatch(startProductsList());
        dispatch(startBillsList());
    }, []);



    const handleChange = (e) => {
        if (e.target.name === 'name') {
            const result = e.target.value;
            if (result.length < 14) {
                setName(result);
            }
        } else if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'phonenumber') {
            const result = e.target.value;
            if (result.length < 11) {
                setPhone(result);
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //  console.log(validator.isEmail(email));
        const correctEmail = validator.isEmail(email) ? email : '';
        const customerInfo = {};

        //customerName validation
        if (name.length > 0) {
            customerInfo.name = name;
            setNameValidate(false);
        } else {
            setNameValidate(true);
        }

        //phone validation
        if (phone.length === 10) {
            customerInfo.mobile = Number(phone);
            setPhoneValidate(false);
        } else {
            setPhoneValidate(true);
        }

        //email validation
        if (correctEmail.length > 0) {
            customerInfo.email = correctEmail;
            setEmailValidate(false)
        } else {
            setEmailValidate(true)
        }
        console.log(customerInfo);

        if (customerInfo.hasOwnProperty('name') && customerInfo.hasOwnProperty('mobile') && customerInfo.hasOwnProperty('email')) {
            dispatch(startCreateCustomer(customerInfo));
        }
        clearFields();

        swal({
            title: "Customer added successfully",
            // text: "You clicked the button!",
            icon: "success",
            // button: "Aww yiss!",
        });

    }

    const handleDelete = (item) => {
        //sweet alert
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this customer data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(asyncDeleteCustomer(item._id));
                    swal("Customer has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Customer was not deleted");
                }
            })
    }

    return (
        <div className="container">
            <div className="row ">
                <div className="col-md-10 text-center mt-5 " style={{ width: '60rem' }}>
                    <h2>Add customers</h2>
                    <form onSubmit={handleSubmit} className="border border-dark shadow-lg p-3 mb-5 bg-white rounded" style={{ marginLeft: '10rem' }}>
                        <div className="mb-3 mx-2 my-4 d-inline-block" >
                            <input type="text" className="form-control shadow-lg ml-3 border border-dark " style={{ width: '100%', border: nameValidate ? '1px solid red' : '' }}
                                name="name"
                                value={name}
                                onChange={handleChange} placeholder="Enter customer name" />
                            {nameValidate && <div className="form-text" style={{ color: 'red' }}>name should be more than 10 characters</div>}
                        </div>

                        <div className="mb-3 mx-2 my-4 d-inline-block">
                            <input type="text" className="form-control shadow-lg ml-3 border border-dark" style={{ width: '100%', border: phoneValidate ? '1px solid red' : '' }}
                                name="phonenumber"
                                value={phone}
                                onChange={handleChange} placeholder="Enter phone number" />
                            {phoneValidate && <div className="form-text" style={{ color: 'red' }}>price</div>}
                        </div>

                        <div className="mb-3 mx-2 my-4 d-inline-block">
                            <input type="email" className="form-control shadow-lg border border-dark mx-auto" style={{ width: '100%', border: emailValidate ? '1px solid red' : '' }}
                                name="email"
                                value={email}
                                onChange={handleChange} placeholder="Enter email" />
                            {emailValidate && <div className="form-text" style={{ color: 'red' }}>Please enter a valid email</div>}
                        </div>
                        <input type="submit" value="Save" className="btn save-btn border border-dark shadow-lg mx-2" />
                    </form>

                    <hr style={{ marginLeft: '10rem', width: '48rem' }} />


                    <div className="d-flex justify-content-center">
                        <h3 style={{ marginLeft: '10rem' }}>Existing Customers</h3 >
                    </div>
                    {customersData.length > 0 ? (

                        <div style={{ width: '48rem' }} >
                            <table className="table  shadow-lg border border-dark rounded table-striped table-hover" style={{ marginLeft: '10rem', backgroundColor: '#7395AE' }} >
                                <thead>
                                    <tr>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">Customer Mobile</th>
                                        <th scope="col">Delete Customer</th>
                                        <th scope="col">Edit Customer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        customersData.map((customer) => {
                                            return <CustomerItem handleDelete={handleDelete} handleSubmit={handleSubmit} customer={customer} key={customer._id} />
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                    ) : (
                        <h2>No Customers found</h2>
                    )
                    }

                </div>
            </div>
        </div>
    )
}

export default Customers
