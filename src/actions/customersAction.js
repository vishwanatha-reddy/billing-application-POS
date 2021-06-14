 import axios from 'axios';


 //list all customers
export const startCustomerList=()=>{
    const token=localStorage.getItem('token');
    return (dispatch)=>{
         
            axios.get('https://dct-billing-app.herokuapp.com/api/customers',{headers:{"Authorization" : `Bearer ${token}`}} )
            .then((res)=>{
                const result=res.data;
                //your formData object data will be converted to JSON stringify format automatically by axios
                if(result.hasOwnProperty('errors')){
                    console.log(result.message)
                }else{
                    // alert('successfully registered');
                    dispatch(setCustomerList(result))
                    // console.log(result,'user info action');
                    // handleLoginRedirect();
                   
                }
            })
            .catch((err)=>{
                console.log(err);
            })
         
    }
}


export const setCustomerList=(list)=>{
     return {
         type:'CUSTOMER_LIST',
         payload:list
     }
 }

//create a customer
export const startCreateCustomer=(customerInfo)=>{
    const token=localStorage.getItem('token');
    return (dispatch)=>{
         
            axios.post('https://dct-billing-app.herokuapp.com/api/customers',customerInfo,{headers:{"Authorization" : `Bearer ${token}`}} )
            .then((res)=>{
                const result=res.data;
                //your formData object data will be converted to JSON stringify format automatically by axios
                if(result.hasOwnProperty('errors')){
                    console.log(result.message)
                }else{
                    // alert('successfully registered');
                    dispatch(setCreateCustomer(result))
                    console.log(result,'create cust action');
                    // handleLoginRedirect();
                   
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        
    }
}

export const setCreateCustomer=(createdCustomer)=>{
    return {
        type:'ADD_CUSTOMER',
        payload:createdCustomer
    }
}

//get a customer
// export const asyncFetchCustomer=(formData,handleLoginRedirect)=>{
//     const token=localStorage.getItem('token');
//     return (dispatch)=>{
//          useEffect(()=>{
//             axios.post(`https://dct-billing-app.herokuapp.com/api/customers/${id}`,{headers:{"Authorization" : `Bearer ${token}`}} )
//             .then((res)=>{
//                 const result=res.data;
//                 //your formData object data will be converted to JSON stringify format automatically by axios
//                 if(result.hasOwnProperty('errors')){
//                     console.log(result.message)
//                 }else{
//                     // alert('successfully registered');
//                     dispatch(setUserInfo(result))
//                     // console.log(result,'user info action');
//                     // handleLoginRedirect();
                   
//                 }
//             })
//             .catch((err)=>{
//                 console.log(err);
//             })
//          },[])
//     }
// }

//update a customer
export const startUpdateCustomer=(customerInfo,id)=>{
    const token=localStorage.getItem('token');
    return (dispatch)=>{

            axios.put(`https://dct-billing-app.herokuapp.com/api/customers/${id}`,customerInfo,{headers:{"Authorization" : `Bearer ${token}`}} )
            .then((res)=>{
                const result=res.data;
                //your formData object data will be converted to JSON stringify format automatically by axios
                if(result.hasOwnProperty('errors')){
                    console.log(result.message)
                }else{
                    // alert('successfully registered');
                    console.log(result, 'updated customer');
                    dispatch(setUpdateCustomer(result))
                    // console.log(result,'user info action');
                    // handleLoginRedirect();
                    
                   
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
}

export const setUpdateCustomer=(updatedCustomer)=>{
    return {
        type:'UPDATE_CUSTOMER',
        payload:updatedCustomer
    }
}

//delete a customer
export const asyncDeleteCustomer=(id)=>{
    const token=localStorage.getItem('token');
    return (dispatch)=>{
         
            axios.delete(`https://dct-billing-app.herokuapp.com/api/customers/${id}`,{headers:{"Authorization" : `Bearer ${token}`}} )
            .then((res)=>{
                const result=res.data;
                //your formData object data will be converted to JSON stringify format automatically by axios
                if(result.hasOwnProperty('errors')){
                    console.log(result.message)
                }else{
                    // alert('successfully registered');
                    // dispatch(setDeleteCustomer(result))
                    // console.log(result,'user info action');
                    // handleLoginRedirect();
                    dispatch(setDeleteCustomer(result));
                   
                }
            })
            .catch((err)=>{
                console.log(err);
            })
         
    }
}

export const setDeleteCustomer=(result)=>{
    return {
        type:'DELETE_CUSTOMER',
        payload:result
    }
}



