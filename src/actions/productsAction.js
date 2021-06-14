 import axios from 'axios'

 //list all products
export const startProductsList=()=>{
    const token=localStorage.getItem('token');
    return (dispatch)=>{
         
            axios.get('https://dct-billing-app.herokuapp.com/api/products',{headers:{"Authorization" : `Bearer ${token}`}} )
            .then((res)=>{
                const result=res.data;
                //your formData object data will be converted to JSON stringify format automatically by axios
                if(result.hasOwnProperty('errors')){
                    console.log(result.message)
                }else{
                    // alert('successfully registered');
                    dispatch(setProductsList(result))
                    
                    // console.log(result,'user info action');
                    // handleLoginRedirect();
                   
                }
            })
            .catch((err)=>{
                console.log(err);
            })
         
    }
}


export const setProductsList=(list)=>{
     return {
         type:'PRODUCTS_LIST',
         payload:list
     }
 }

//create a product
export const startCreateProduct=(customerInfo)=>{
    const token=localStorage.getItem('token');
    return (dispatch)=>{
         
            axios.post('https://dct-billing-app.herokuapp.com/api/products',customerInfo,{headers:{"Authorization" : `Bearer ${token}`}} )
            .then((res)=>{
                const result=res.data;
                //your formData object data will be converted to JSON stringify format automatically by axios
                if(result.hasOwnProperty('errors')){
                    console.log(result.message)
                }else{
                    // alert('successfully registered');
                    dispatch(setCreateProduct(result))
                    console.log(result,'created product');
                    // handleLoginRedirect();
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        
    }
}

export const setCreateProduct=(createdProduct)=>{
    return {
        type:'ADD_PRODUCT',
        payload:createdProduct
    }
}

//update product
export const startUpdateProduct=(productInfo,id)=>{
    const token=localStorage.getItem('token');
    return (dispatch)=>{
         
            axios.put(`https://dct-billing-app.herokuapp.com/api/products/${id}`,productInfo,{headers:{"Authorization" : `Bearer ${token}`}} )
            .then((res)=>{
                const result=res.data;
                //your formData object data will be converted to JSON stringify format automatically by axios
                if(result.hasOwnProperty('errors')){
                    console.log(result.message)
                }else{
                    dispatch(setUpdateProduct(result))
                    // dispatch(startProductsList());
                    console.log(result,'updated product');
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        
    }
}

export const setUpdateProduct=(updatedProduct)=>{
    return {
        type:'UPDATE_PRODUCT',
        payload:updatedProduct
    }
}

//delete a product
export const asyncDeleteProduct=(id)=>{
    const token=localStorage.getItem('token');
    return (dispatch)=>{
            axios.delete(`https://dct-billing-app.herokuapp.com/api/products/${id}`,{headers:{"Authorization" : `Bearer ${token}`}} )
            .then((res)=>{
                const result=res.data;
                //your formData object data will be converted to JSON stringify format automatically by axios
                if(result.hasOwnProperty('errors')){
                    console.log(result.message)
                }else{
                    dispatch(setDeleteProduct(result));
                    // alert('successfully registered');
                    // dispatch(setDeleteCustomer(result))
                    // console.log(result,'user info action');
                    // handleLoginRedirect();
                    // dispatch(startProductsList());
                    
                }
            })
            .catch((err)=>{
                console.log(err);
            })
         
    }
}

export const setDeleteProduct=(result)=>{
    return {
        type:'DELETE_PRODUCT',
        payload:result
    }
}