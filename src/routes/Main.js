import React from "react";
import { Switch } from 'react-router-dom';
import withGuest from "utils/withGuest";
import LayoutRoute from "components/Router/LayoutRoute";
import MainLayout from "containers/layouts/Main";
import RecipeListPage from "containers/page/recipe/list";
import RecipeShowPage from "containers/page/recipe/show";
import LoginPage from "containers/page/auth/login";

const MainRoute = () => {
  return ( 
    <Switch>
      <LayoutRoute exact path="/" layout={MainLayout} component={RecipeListPage} />
      <LayoutRoute exact path="/recipe/:id" layout={MainLayout} component={RecipeShowPage} />
      <LayoutRoute exact path="/auth/login" layout={MainLayout} component={withGuest(LoginPage)} />
    </Switch>
  )
}

export default MainRoute;
