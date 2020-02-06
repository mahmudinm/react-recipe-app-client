import React from "react";
import { Switch } from 'react-router-dom';
import withAuth from "utils/withAuth";
import LayoutRoute from "components/Router/LayoutRoute";

import AdminLayout from "containers/layouts/Admin";

import RecipeListPage from "containers/page/admin/recipe";
import CategoryListPage from "containers/page/admin/category";
import IngredientListPage from "containers/page/admin/ingredient";
import PermissionListPage from "containers/page/admin/permission";
import RoleListPage from "containers/page/admin/role";
import UserListPage from "containers/page/admin/user";

const AdminRoute = () => {
  return (
    <Switch>
    
      {/*Category Page*/}
      <LayoutRoute exact path="/admin/recipe" layout={AdminLayout} component={withAuth(RecipeListPage)} />
    
      {/*Category Page*/}
      <LayoutRoute exact path="/admin/category" layout={AdminLayout} component={withAuth(CategoryListPage)} />

      {/*Ingredient Page*/}
      <LayoutRoute exact path="/admin/ingredient" layout={AdminLayout} component={withAuth(IngredientListPage)} />

      {/*User Page*/}
      <LayoutRoute exact path="/admin/user" layout={AdminLayout} component={withAuth(UserListPage)} />

      {/*Permission Page*/}
      <LayoutRoute exact path="/admin/permission" layout={AdminLayout} component={withAuth(PermissionListPage)} />

      {/*Permission Page*/}
      <LayoutRoute exact path="/admin/role" layout={AdminLayout} component={withAuth(RoleListPage)} />


    </Switch>
  )
}

export default AdminRoute;
