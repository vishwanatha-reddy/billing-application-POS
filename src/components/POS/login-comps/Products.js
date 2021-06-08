import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert';

import '../dashboard-comps/dash-comps.css';
import { asyncDeleteProduct, startProductsList } from '../../../actions/productsAction'
import { startCreateProduct } from '../../../actions/productsAction'
import ProductItem from '../../../edit-form/ProductItem'


const Products = (props) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const [nameValidate, setNameValidate] = useState(false);
    const [priceValidate, setPriceValidate] = useState(false);

    const dispatch = useDispatch();

    const productsData = useSelector((store) => {
        return store.products;
    })

    // console.log(productsData);

    useEffect(() => {
        dispatch(startProductsList());
    }, [])


    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        } else if (e.target.name === 'price') {
            setPrice(e.target.value)
        }
    }

    const clearFields = () => {
        setName('');
        setPrice('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const productInfo = {};

        //customerName validation
        if (name.length >= 3) {
            productInfo.name = name;
            setNameValidate(false);
        } else {
            setNameValidate(true);
        }

        //price validation
        if (Number(price) > 0) {
            productInfo.price = Number(price);
            setPriceValidate(false);
        } else {
            setPriceValidate(true);
        }

        // console.log(productInfo);

        dispatch(startCreateProduct(productInfo));

        clearFields();

        swal({
            title: "Product added successfully",
            // text: "You clicked the button!",
            icon: "success",
            // button: "Aww yiss!",
        });
    }

    const handleDelete = (item) => {
        //sweet alert
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this product data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(asyncDeleteProduct(item._id));
                    swal("Product has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Product was not deleted");
                }
            })
    }


    return (
        <div className="container ">
            <div className="row ">
                <div className="col-md-10 text-center mt-5 ">
                    <h2 >Add products</h2>
                    <form onSubmit={handleSubmit} className="border w-75 border-dark shadow-lg p-3 mb-5 bg-white rounded" style={{ marginLeft: '10rem' }}>
                        <div className="mb-3 mx-2 my-4 d-inline-block" >
                            <input type="text" className="form-control border border-dark shadow-lg ml-3 " style={{ width: '120%', border: nameValidate ? '1px solid red' : '' }}
                                name="name"
                                value={name}
                                onChange={handleChange} placeholder="Enter product name" />
                            {nameValidate && <div className="form-text" style={{ color: 'red' }}>name should be more than 3 characters</div>}
                        </div>

                        <div className="mb-3 my-4 d-inline-block" style={{ marginLeft: '5rem' }}>
                            <input type="text" className="form-control border border-dark shadow-lg ml-auto " style={{ width: '70%', border: priceValidate ? '1px solid red' : '' }}
                                name="price"
                                value={price}
                                onChange={handleChange} placeholder="Enter price" />
                            {priceValidate && <div className="form-text" style={{ color: 'red' }}>price should be a positive value</div>}
                        </div>
                        <input type="submit" value="Save" className="btn shadow-lg save-btn border border-dark mx-2" />
                    </form>

                    <hr className="w-75" style={{ marginLeft: '10rem' }} />

                    <div className="d-flex justify-content-center">
                        <h3 style={{ marginLeft: '2rem' }}>Existing Products</h3 >
                    </div>
                    {productsData.length > 0 ? (

                        <div className="table-responsive " id="list">
                            <table className="table  border border-dark table-striped table-hover w-75 shadow-lg p-3 mb-5  rounded" style={{ marginLeft: '10rem', width: '40rem', backgroundColor: '#7395AE' }} >
                                <thead>
                                    <tr>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Product Price</th>
                                        <th scope="col">Delete Product</th>
                                        <th scope="col">Edit product</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productsData.map((item) => {
                                            return <ProductItem handleDelete={handleDelete} handleSubmit={handleSubmit} item={item} key={item._id} />
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                    ) : (
                        <h2>No Products found</h2>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default Products
