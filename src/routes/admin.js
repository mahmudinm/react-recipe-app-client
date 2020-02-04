import React from "react";
import { Switch } from 'react-router-dom';
import withAuth from "utils/withAuth";
import LayoutRoute from "components/Router/LayoutRoute";

import AdminLayout from "containers/layouts/Admin";

import CategoryListPage from "containers/page/admin/category";
import IngredientListPage from "containers/page/admin/ingredient";
import PermissionListPage from "containers/page/admin/permission";
import RoleListPage from "containers/page/admin/role";
import UsersListPage from "containers/page/admin/users/list";

const AdminRoute = () => {
  return (
    <Switch>
    
      {/*Category Page*/}
      <LayoutRoute exact path="/admin/category" layout={AdminLayout} component={withAuth(CategoryListPage)} />

      {/*Ingredient Page*/}
      <LayoutRoute exact path="/admin/ingredient" layout={AdminLayout} component={withAuth(IngredientListPage)} />

      {/*Permission Page*/}
      <LayoutRoute exact path="/admin/permission" layout={AdminLayout} component={withAuth(PermissionListPage)} />

      {/*Permission Page*/}
      <LayoutRoute exact path="/admin/role" layout={AdminLayout} component={withAuth(RoleListPage)} />

      {/*Users*/}
      <LayoutRoute exact path="/admin/users" layout={AdminLayout} component={withAuth(UsersListPage)} />
    </Switch>
  )
}

export default AdminRoute;
