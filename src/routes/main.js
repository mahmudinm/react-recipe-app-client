import React from "react";
import { Switch } from 'react-router-dom';
import LayoutRoute from "components/Router/LayoutRoute";
import MainLayout from "containers/layouts/Main";
import LoginPage from "containers/page/auth/login";

const MainRoute = () => {
  return (
    <Switch>
      <LayoutRoute path="/auth/login" layout={MainLayout} component={LoginPage} />
    </Switch>
  )
}

export default MainRoute;
