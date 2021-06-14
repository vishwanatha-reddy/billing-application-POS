import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert';
import MaterialTable from 'material-table'

import '../dashboard-comps/dash-comps.css'
import { asyncDeleteProduct, startProductsList, startUpdateProduct } from '../../../actions/productsAction'
import { startCreateProduct } from '../../../actions/productsAction'



const Products = (props) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const [nameValidate, setNameValidate] = useState(false);
    const [priceValidate, setPriceValidate] = useState(false);

    const dispatch = useDispatch();

    const productsData = useSelector((store) => {
        return store.products;
    })

    console.log(productsData);

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

        console.log(productInfo);

        dispatch(startCreateProduct(productInfo));

        clearFields();

        swal({
            title: "Product added successfully",
            // text: "You clicked the button!",
            icon: "success",
            // button: "Aww yiss!",
        });
    }

    //table product delete
    const handleDelete = (delItem) => {
        console.log(delItem);
        const deletedProd = productsData.find((prod) => {
            return prod.name === delItem.name;
        })
        console.log(deletedProd._id);
        dispatch(asyncDeleteProduct(deletedProd._id));
        swal("Product has been deleted!", {
            icon: "success",
        });
    }

    //table product update
    const handleProdUpdate = (updatedProdData, oldProdData) => {
        //  e.preventDefault();
        const productInfo = {};

        const { name, price } = updatedProdData;

        //product name validation
        if (name.length >= 3) {
            productInfo.name = name;
        }

        //price validation
        if (price > 0) {
            productInfo.price = price;
        }

        console.log(productInfo, oldProdData);

        const updatedProd = productsData.find((prod) => {
            return prod.name === oldProdData.name;
        })
        console.log(updatedProd._id);

        dispatch(startUpdateProduct(productInfo, updatedProd._id));

        // handleToggle();

        swal({
            title: "Product info updated!",
            // text: "You clicked the button!",
            icon: "success",
            // button: "Aww yiss!",
        });
    }


    //material table
    const materialTableData = productsData.map((item) => {
        return {
            name: item.name,
            price: item.price
        }
    });


    //columns
    const columns = [
        {
            title: 'Product Name', field: 'name'
        },
        {
            title: 'Product Price ($)', field: 'price'
        },
    ]



    return (
        <div className="container ">
            <div className="row ">
                <div className="col-md-9 offset-md-1   text-center mt-5 ">
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
                    {/* { productsData.length>0 ?(
                       
                           <div className="table-responsive ">
                                <table className="table  border border-dark table-striped table-hover w-75 shadow-lg p-3 mb-5  rounded" style={{marginLeft:'10rem',width:'40rem',backgroundColor:'#7395AE'}} >
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
                                        productsData.map((item)=>{
                                            return <ProductItem handleDelete={handleDelete} handleSubmit={handleSubmit} item={item} key={item._id}/>
                                        })
                                    }
                                </tbody>
                            </table>
                           </div>
                        
                        ):(
                            <h2>No Products found</h2>
                        )
                    } */}
                </div>
                <div className="row">
                    <div className="d-none d-lg-block col-md-8 offset-md-2 ">
                        <MaterialTable title="Products"
                            data={materialTableData}
                            columns={columns}
                            onRowClick={(event,rowData)=>{
                                console.log(rowData);
                            }

                            }

                            editable={{
                                onRowDelete: selectedRow => new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        handleDelete(selectedRow);
                                        resolve();
                                    }, 2000)
                                }),
                                onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        handleProdUpdate(updatedRow, oldRow);
                                        resolve();
                                    }, 2000)
                                }),
                                //  onRowClick: (event, RowData) => new Promise((resolve, reject) => {
                                //     setTimeout(() => {
                                //         // handleProdUpdate(updatedRow, oldRow);
                                //         console.log(RowData);
                                //         resolve();
                                //     }, 2000)
                                // })
                            }}
                            options={{
                                filtering: false,
                                exportButton: true,
                                actionsColumnIndex: 2,
                                
                                headerStyle: {
                                    backgroundColor: '#01579b',
                                    color: '#FFF'
                                },
                                rowStyle: {
                                    backgroundColor: '#EEE',
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products
