import React from 'react';
import {Link,Route, withRouter,Switch} from 'react-router-dom';

import '../../App.css';
import Home from './Home';
import Login from './Login';
import Register from './Register'; 
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Billing from './login-comps/Billing'
import Products from './login-comps/Products'
import Customers from './login-comps/Customers'
import Profile from './login-comps/Profile'

const NavBar=(props)=> {
    const {userLoggedIn,handleAuth}=props;
    return (
        <div >
          <nav className="navbar navbar-expand-lg navbar-light navUl  ">
            <div className="container-fluid ">
                <div className="collapse navbar-collapse nav-ul navUl " id="navbarNavDropdown">
                  <ul className="navbar-nav ml-15 navUl">
                    <li className="nav-item">
          {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                      <Link className="nav-link active" style={{color:'#f5f5f5',fontSize:'1.2rem'}} to="/">Home</Link>
                    </li>
        
                        <li className="nav-item">
                          <Link className="nav-link active" style={{color:'#f5f5f5',fontSize:'1.2rem'}} to="/register">Register</Link>
                        </li>

                        <li className="nav-item"> 
                          <Link className="nav-link active " style={{color:'#f5f5f5',fontSize:'1.2rem'}} to="/login">Login</Link>
                        </li>
                  </ul>
                </div>
              </div>
          </nav>

              <Switch>
                {/* before login */}
                <Route path="/" component={Home} exact={true}/>
                <Route path="/register" component={Register} exact={true}/>
                <Route path="/login" render={(props)=>{
                  return <Login
                        {...props}//lec 33, need to pass this prop to get history object n push etc properties
                        handleAuth={handleAuth}
                        />
              }}/>

              {/* after login */}
              <Route path="/billing" component={Billing} exact={true}/>
              <Route path="/customers" component={Customers}  exact={true}/>
              <Route path="/products" component={Products} exact={true}/>
              <Route path="/profile" component={Profile} exact={true}/>
              <Route path="/dashboard" component={Dashboard} exact={true}/>

              <ProtectedRoute path="/dashboard" component={Dashboard} userLoggedIn={userLoggedIn}/>
              <Route path="*" component={()=><h1>404 NOT FOUND</h1>}/>
              </Switch>

        </div>
    )
}

// const WrappedComponent=withRouter(NavBar);

// export default WrappedComponent;

export default withRouter(NavBar);
