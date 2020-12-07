import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../layouts/Header";
import PrivateRoute from "../router/privateRoute";
import NewAppointment from "../views/appointment/Add-new-appointment";
import Appointments from "../views/appointment/Appointments";
import EditAppointment from "../views/appointment/Edit-appointment";
import Login from "../views/auth/login";
import Register from "../views/auth/register";
export default function App() {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-10">
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route exact path={"/register"} component={Register} />
          <PrivateRoute path={"/appointments"} component={Appointments} />
          <PrivateRoute
            path={"/appointment/add-new"}
            component={NewAppointment}
          />
          <PrivateRoute
            path={"/appointment/edit/:id"}
            component={EditAppointment}
          />
        </Switch>
      </div>
    </div>
  );
}
