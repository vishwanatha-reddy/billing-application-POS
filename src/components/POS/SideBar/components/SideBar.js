import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { Link,Switch, Route , withRouter, Redirect} from 'react-router-dom';
import swal from 'sweetalert';

import { SidebarData } from './SidebarData';
import './Sidebar.css';
import Profile from '../../login-comps/Profile';
import Dashboard  from '../../Dashboard';
import Home from '../../Home';
import Register from '../../Register';
import Customers from '../../login-comps/Customers'
import Products from '../../login-comps/Products'
import Billing from '../../login-comps/Billing'
import ProtectedRoute from '../../ProtectedRoute';
import Login from '../../Login';
import NotFound from '../../login-comps/NotFound';

const SideBar=(props)=> {

  const {handleAuth,userLoggedIn}=props;
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
     {userLoggedIn?(
         <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>    
              <h3 style={{color:'white',marginLeft:'33%'}} >POS - Billing application</h3>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
              
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className="nav-text">
              <Link className="nav-link active" to="" onClick={()=>{
                            localStorage.removeItem('token');
                            swal({
                                title: "Logged out successfully",
                                icon: "success",
                            });
                            handleAuth();
                            props.history.push('/');
                        }}><RiIcons.RiLogoutCircleRLine className="mRight"  />Logout</Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
     ):(
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
     )}

      <Switch>
        {/*before login*/}
                <Route path="/" component={Home} exact={true}/>
                <Route path="/register" component={Register} exact={true}/>
                <Route path="/login" render={(props)=>{
                  return <Login
                        {...props}//lec 33, need to pass this prop to get history object n push etc properties
                        handleAuth={handleAuth}
                        userLoggedIn={userLoggedIn}
                        />
              }}/>
            
        {/*after login*/}
           {/* <Route path='/dashboard'>
             {userLoggedIn && <Dashboard/>}
             {!userLoggedIn && <Redirect to="/login"/>}
             </Route> */}

             <Route path='/products'>
             {userLoggedIn && <Products/>}
             {!userLoggedIn && <Redirect to="/login"/>}
             </Route> 

             <Route path='/customers'>
             {userLoggedIn && <Customers/>}
             {!userLoggedIn && <Redirect to="/login"/>}
             </Route>

             <Route path='/billing'>
             {userLoggedIn && <Billing/>}
             {!userLoggedIn && <Redirect to="/login"/>}
             </Route>

             <Route path='/profile'>
             {userLoggedIn && <Profile/>}
             {!userLoggedIn && <Redirect to="/login"/>}
             </Route>

             <Route path='/notfound' component={NotFound} exact={true}/>

              {/* <Route path='/dashboard' component={Dashboard} exact={true}/> */}
          {/* <Route path='/products' component={Products} exact={true} />
          <Route path='/customers' component={Customers} exact={true} />
          <Route path='/billing' component={Billing}  exact={true}/>
          <Route path='/profile' component={Profile} exact={true} /> */}

          <ProtectedRoute path="/dashboard" component={Dashboard}  userLoggedIn={userLoggedIn}/>
          {/* <ProtectedRoute path="/products" component={Products} userLoggedIn={userLoggedIn}/>
          <ProtectedRoute path="/customers" component={Customers} userLoggedIn={userLoggedIn}/> */}
            {/* <Route path='*' component={()=><h1>404 NOT FOUND</h1>}/> */}
            <Route path='*'> <Redirect to="notfound"/></Route>
        </Switch>
    </div>

    
  );
}

export default withRouter(SideBar);
