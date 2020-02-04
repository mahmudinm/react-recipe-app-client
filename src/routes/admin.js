import React from "react";
import { Switch } from 'react-router-dom';
import withAuth from "utils/withAuth";
import LayoutRoute from "components/Router/LayoutRoute";

import AdminLayout from "containers/layouts/Admin";

import CategoryListPage from "containers/page/admin/category";
import IngredientListPage from "containers/page/admin/ingredient";
import UsersListPage from "containers/page/admin/users/list";
import UsersFormPage from "containers/page/admin/users/form";

const AdminRoute = () => {
  return (
    <Switch>
    
      {/*Category Page*/}
      <LayoutRoute exact path="/admin/category" layout={AdminLayout} component={withAuth(CategoryListPage)} />

      {/*Ingredient Page*/}
      <LayoutRoute exact path="/admin/ingredient" layout={AdminLayout} component={withAuth(IngredientListPage)} />

      {/*Users*/}
      <LayoutRoute exact path="/admin/users" layout={AdminLayout} component={withAuth(UsersListPage)} />
      <LayoutRoute path="/admin/users/create" layout={AdminLayout} component={withAuth(UsersFormPage)} />
      <LayoutRoute path="/admin/users/:id/edit" layout={AdminLayout} component={withAuth(UsersFormPage)} />

    </Switch>
  )
}

export default AdminRoute;
