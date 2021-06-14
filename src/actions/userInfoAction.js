 import axios from 'axios'
 
 //start or async for action creators responsible for api call

export const asyncUserInfo=()=>{
    const token=localStorage.getItem('token');
    return (dispatch)=>{
            axios.get('https://dct-billing-app.herokuapp.com/api/users/account',{headers:{"Authorization" : `Bearer ${token}`}} )
            .then((res)=>{
                const result=res.data;
                //your formData object data will be converted to JSON stringify format automatically by axios
                if(result.hasOwnProperty('errors')){
                    console.log(result.message)
                }else{
                    // alert('successfully registered');
                    dispatch(setUserInfo(result))
                    // console.log(result,'user info action');
                    // handleLoginRedirect();
                   
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
}

 
 export const setUserInfo=(userInfo)=>{
     return {
         type:'USER_INFO',
         payload:userInfo
     }
 }