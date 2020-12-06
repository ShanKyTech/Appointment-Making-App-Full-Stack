import React from "react";
import { Redirect, Route } from "react-router-dom";
import authenticate from "../services/auth";
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticate() === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);
export default PrivateRoute;
