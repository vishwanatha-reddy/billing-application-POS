 import axios from 'axios'
 
 //start or async for action creators responsible for api call

export const asyncRegisterUser=(formData,handleLoginRedirect)=>{
    return (dispatch)=>{
         axios.post('https://dct-billing-app.herokuapp.com/api/users/register',formData)
            .then((res)=>{
                const result=res.data;
                //your formData object data will be converted to JSON stringify format automatically by axios
                if(result.hasOwnProperty('errors')){
                    alert(result.message)
                }else{
                    alert('successfully registered');
                    handleLoginRedirect();
                   
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
}

 
    

 export const setUsers=(users)=>{
     return {
         type:'SET_USERS',
         payload:users
     }
 }