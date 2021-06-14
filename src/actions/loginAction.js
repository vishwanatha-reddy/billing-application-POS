 import axios from 'axios'
 
 //start or async for action creators responsible for api call

//  export const startGetUsers=()=>{
//      return (dispatch)=>{
//         //api call
//         axios.get('https://jsonplaceholder.typicode.com/users')
//         .then((res)=>{
//             const users=res.data;
//             dispatch(setUsers(users))
//         })
//         .catch((err)=>{
//             alert(err.message)
//         })
//      }
//  }

export const asyncLoginUser=(formData,handleHomeRedirect)=>{
    return (dispatch)=>{
        axios.post('https://dct-billing-app.herokuapp.com/api/users/login',formData)
            .then((res)=>{
                const result=res.data;
                if(result.hasOwnProperty('errors')){
                    alert(result.errors);   
                }else{
                    console.log('successfully logged in ');
                    localStorage.setItem('token',result.token);
                    handleHomeRedirect();
                }
            })
            .catch((err)=>{
                console.log(err.message);
            })
    }
}

 
    

 export const setUsers=(users)=>{
     return {
         type:'SET_USERS',
         payload:users
     }

 }