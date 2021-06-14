import React,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { asyncLoginUser } from '../../actions/loginAction';
import validator from 'validator';
import Dashboard from './Dashboard';
import { Link,Switch, Route , withRouter, Redirect} from 'react-router-dom';

const Login=(props)=>{
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const [emailValidate,setEmailValidate]=useState(false);
    const [pwdValidate,setPwdValidate]=useState(false);
    
    const dispatch=useDispatch(); 


    const handleHomeRedirect=()=>{
        props.history.push('/dashboard');
        props.handleAuth();
        
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const correctEmail=validator.isEmail(email)?email:'';
        const formData={};

        //email validation
        if(correctEmail.length>0){
            formData.email=correctEmail;
            setEmailValidate(false)
        }else{
            setEmailValidate(true)
        }

        //password validation
        if(password.length>8 && password.length<128){
            formData.password=password;
            setPwdValidate(false);
        }else{
            setPwdValidate(true);
        }

        // const formData={
        //     email,
        //     password
        // }
        console.log(formData);
        //if validations pass
        dispatch(asyncLoginUser(formData,handleHomeRedirect));
    }

    const handleChange=(e)=>{
        if(e.target.name==='email'){
            setEmail(e.target.value);
        }else if(e.target.name==='password'){
            setPassword(e.target.value)
        }
    }
    return (
        <div className="container">
            <div className="row ">
          <div className="col-md-10  text-center ">
                    <div className="mx-4">
            <h2 className="mx-2 mb-4">Login to your account</h2>
            <form onSubmit={handleSubmit} >

                <div className="mb-3 mx-2">
                <input type="email" className="form-control mx-auto" style={{width:'25%',border:emailValidate?'1px solid red':''}} 
                name="email" 
                value={email}
                onChange={handleChange} placeholder="Enter email"/>
                {emailValidate && <div  className="form-text" style={{color:'red'}}>Please enter a valid email</div>}
                </div>

                <div className="mb-3 mx-2">
                    <input type="password" name="password" 
                 value={password}
                 onChange={handleChange} className="form-control mx-auto" style={{width:'25%',border:pwdValidate?'1px solid red':''}} id="exampleInputPassword1" placeholder="Enter password"/>
                 {pwdValidate && <div  className="form-text" style={{color:'red'}}>Please enter a valid password</div>}
                 </div>
                 
                 <input type="submit" value="Login" className="btn btn-success mx-2"/> 
                 
                </form>    
                </div>
          </div>
            </div>
            <Switch>
                <Route path='/dashboard' component={Dashboard} exact={true}/>
            </Switch>
        </div>
    )
}

export default withRouter(Login)
