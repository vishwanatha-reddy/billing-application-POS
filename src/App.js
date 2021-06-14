import React,{useState,useEffect} from 'react';

import SideBar from './components/POS/SideBar/components/SideBar';
import {BrowserRouter as Router, Link,Switch, Route , withRouter, Redirect} from 'react-router-dom'

const App=(props)=> {
  const [userLoggedIn,setUserLoggedIn]=useState(false);

  const handleAuth=()=>{
    setUserLoggedIn(!userLoggedIn);
 
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
      handleAuth();
    }
  },[])

  console.log(userLoggedIn);
  return (
    <Router >
       <SideBar handleAuth={handleAuth} userLoggedIn={userLoggedIn} />
    </Router>
  );
}

export default App;
