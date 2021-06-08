import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Login from './Login';

const ProtectedRoute = ({ userLoggedIn, component: Component, ...rest }) => {
    // const {userLoggedIn}=props;
    // console.log(userLoggedIn);
    const finalComponent = userLoggedIn ? Component : Login;
    return <Route {...rest} component={finalComponent} />;

    // <Route
    //     {...rest}
    //     render={props => {
    //         userLoggedIn ? (
    //             <Component {...props} />
    //         ) : (
    //             <Redirect
    //                 to={{
    //                     pathname: "/login",
    //                     state: { from: props.location }
    //                 }}
    //             />
    //         )
    //     }
    //     }
    // />
};


export default ProtectedRoute
