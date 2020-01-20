import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import LayoutRoute from "components/Router/LayoutRoute";
import AdminRoute from "routes/Admin";
import MainRoute from "routes/Main";

import MainLayout from "containers/layouts/Main"

import LoginPage from "containers/page/auth/login";
import RegisterPage from "containers/page/auth/register";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
   		<LayoutRoute exact path="/auth/login" layout={MainLayout} component={LoginPage} />
   		<LayoutRoute exact path="/auth/register" layout={MainLayout} component={RegisterPage} />

   		<AdminRoute />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
