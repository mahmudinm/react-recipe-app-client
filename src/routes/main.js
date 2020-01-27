import React from "react";
import { Switch } from 'react-router-dom';
import LayoutRoute from "components/Router/LayoutRoute";
import MainLayout from "containers/layouts/Main";
import LoginPage from "containers/page/auth/login";
import RegisterPage from "containers/page/auth/register";

const MainRoute = () => {
  return (
    <Switch>
      <LayoutRoute exact path="/auth/login" layout={MainLayout} component={LoginPage} />
      <LayoutRoute exact path="/auth/register" layout={MainLayout} component={RegisterPage} />
    </Switch>
  )
}

export default MainRoute;
