import React from 'react';
import {  Route, Redirect  } from 'react-router-dom';

export const PrivateRoute = ({component: Component, isAuthen, ...rest}) =>(
  <Route
    {...rest}
    render={(props) => isAuthen === true
      ? <Component isAuthen={isAuthen} {...props} {...rest} />
      : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
  />
)

export const PublicRoute = ({component: Component, path, ...rest}) =>
    <Route 
    exact path={path}
    render={
      (props) => <Component {...props} {...rest} />
    }
  />