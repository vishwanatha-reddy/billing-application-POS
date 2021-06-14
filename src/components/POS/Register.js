import React,{useState} from 'react'
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux'
import validator from 'validator';

import {asyncRegisterUser} from '../../actions/registerAction';

const Register=(props)=> {
    const [username, setUsername]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [businessName,setBusinessName]=useState('');
    const [address,setAddress]=useState('');

    const [nameValidate,setNameValidate]=useState(false);
    const [emailValidate,setEmailValidate]=useState(false);
    const [pwdValidate,setPwdValidate]=useState(false);
    const [bNameValidate,setBNameValidate]=useState(false);
    const [addressValidate,setAddressValidate]=useState(false);

    const dispatch=useDispatch();

    const handleLoginRedirect=()=>{
        console.log('redirect called');
        props.history.push('/login');
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        //  console.log(validator.isEmail(email));
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

        //username validation
        if(username.length>5){
            formData.username=username;
            setNameValidate(false);
        }else{
            setNameValidate(true);
        }
        console.log(formData);

        //business name validation
        if(businessName.length>5){
            formData.businessName=businessName;
            setBNameValidate(false);
        }else{
            setBNameValidate(true);
        }

        //address validation

        if(address.length>15){
            formData.address=address;
            setAddressValidate(false);
        }else{
            setAddressValidate(true);
        }

         console.log(formData);
         dispatch(asyncRegisterUser(formData,handleLoginRedirect));
        
    }

    const handleChange=(e)=>{
        if(e.target.name==='username'){
            setUsername(e.target.value)
        }else if(e.target.name==='email'){
            setEmail(e.target.value)
        }else if(e.target.name==='password'){
            setPassword(e.target.value)
        }else if(e.target.name==='businessName'){
            setBusinessName(e.target.value)
        }else if(e.target.name==='address'){
            setAddress(e.target.value)
        }
    }

    return (
        <div className="container">
            <div className="row ">
                <div className="col-md-10  text-center ">
                    <div className="mx-4">
            <h2 className="mx-2 mb-4">Register</h2>
            <form onSubmit={handleSubmit} >
                <div className="mb-3 mx-2">
                    <input type="text" className="form-control mx-auto " style={{width:'25%',border:nameValidate?'1px solid red':''}} 
                         name="username" 
                        value={username}
                         onChange={handleChange} placeholder="Enter username"/>
                        {nameValidate && <div  className="form-text" style={{color:'red'}}>Please enter a valid username</div>}
                </div>

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

                 <div className="mb-3 mx-2">
                    <input type="text" className="form-control mx-auto " style={{width:'25%',border:bNameValidate?'1px solid red':''}} 
                         name="businessName" 
                        value={businessName}
                         onChange={handleChange} placeholder="Enter Business Name"/>
                        {bNameValidate && <div  className="form-text" style={{color:'red'}}>Business Name should be more than 5 characters</div>}
                </div>

            <div className="mb-3 mx-2">
                    <textarea className="form-control mx-auto" style={{width:'25%',height:'6rem',border:addressValidate?'1px solid red':''}} 
                         name="address" 
                        value={address}
                         onChange={handleChange} placeholder="Enter Address"></textarea>
                        {addressValidate && <div  className="form-text" style={{color:'red'}}>Address should be more than 15 characters</div>}
                </div>

                 <input type="submit" value="Register" className="btn btn-success mx-2"/> 
                </form>    
                </div>
          </div>
            </div>
        </div>
    )
}

export default Register
