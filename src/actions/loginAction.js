 import axios from 'axios'
 import swal from 'sweetalert';
 
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

export const asyncLoginUser=(formData,handleHomeRedirect, handleSpinner,invalidCredRedirect)=>{
    return (dispatch)=>{
        axios.post('https://dct-billing-app.herokuapp.com/api/users/login',formData)
            .then((res)=>{
                const result=res.data;
                if(result.hasOwnProperty('errors')){ 
                    // alert(result.errors);
                    swal(`${result.errors}`);
                    invalidCredRedirect();
                }else{
                    console.log('successfully logged in ');
                    handleSpinner();
                    localStorage.setItem('token',result.token);
                    handleHomeRedirect();
                }
            })
            .catch((err)=>{
                console.log(err.message);
                handleSpinner();  
            })
    } 
}

 
    

 export const setUsers=(users)=>{
     return {
         type:'SET_USERS',
         payload:users
     }

 }