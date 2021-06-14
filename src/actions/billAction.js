import axios from 'axios';

//get all bills
export const startBillsList=()=>{
    const token=localStorage.getItem('token');
    return (dispatch)=>{
         
            axios.get('https://dct-billing-app.herokuapp.com/api/bills',{headers:{"Authorization" : `Bearer ${token}`}} )
            .then((res)=>{
                const result=res.data;
                //your formData object data will be converted to JSON stringify format automatically by axios
                if(result.hasOwnProperty('errors')){
                    console.log(result.message)
                }else{
                    // alert('successfully registered');
                    dispatch(setBillList(result))
                    
                    // console.log(result,'user info action');
                    // handleLoginRedirect();
                   
                }
            })
            .catch((err)=>{
                console.log(err);
            })
         
    }
}

const setBillList=(billList)=>{
    return {
        type:'BILL_LIST',
        payload:billList
    }
}



//generate a bill
export const startGenerateBill=(billInfo)=>{
    const token=localStorage.getItem('token');
    console.log(billInfo);
    return (dispatch)=>{
         
            axios.post('https://dct-billing-app.herokuapp.com/api/bills',billInfo,{headers:{"Authorization" : `Bearer ${token}`}} )
            .then((res)=>{
                const result=res.data;
                //your formData object data will be converted to JSON stringify format automatically by axios
                if(result.hasOwnProperty('errors')){
                    console.log(result.message)
                }else{
                    // alert('successfully registered');
                    dispatch(setGeneratedBill(result))
                    console.log(result,'created bill');
                    // handleLoginRedirect();
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        
    }
}

export const setGeneratedBill=(generatedBill)=>{
    return {
        type:'GENERATE_BILL',
        payload:generatedBill
    }
}

//delete a bill
export const asyncBillDelete=(id)=>{
    const token=localStorage.getItem('token');
    return (dispatch)=>{
         
            axios.delete(`https://dct-billing-app.herokuapp.com/api/bills/${id}`,{headers:{"Authorization" : `Bearer ${token}`}} )
            .then((res)=>{
                const result=res.data;
                //your formData object data will be converted to JSON stringify format automatically by axios
                if(result.hasOwnProperty('errors')){
                    console.log(result.message)
                }else{
                    // alert('successfully registered');
                    dispatch(setDeleteBill(result))
                    console.log(result,'deleted bill');
                    // handleLoginRedirect();
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        
    }
}

export const setDeleteBill=(deletedBill)=>{
    return {
        type:'DELETE_BILL',
        payload:deletedBill
    }
}