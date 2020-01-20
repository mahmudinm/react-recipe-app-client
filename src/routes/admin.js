import React from "react";
import { Switch } from 'react-router-dom';
import LayoutRoute from "components/Router/LayoutRoute";

import AdminLayout from "containers/layouts/Admin";

import CategoryListPage from "containers/page/admin/category/list";
import CategoryFormPage from "containers/page/admin/category/form";

import UsersListPage from "containers/page/admin/users/list";
import UsersFormPage from "containers/page/admin/users/form";

const AdminRoute = () => {
  return (
    <Switch>
    
      {/*Category*/}
      <LayoutRoute exact path="/admin/category" layout={AdminLayout} component={CategoryListPage} />
      <LayoutRoute path="/admin/category/create" layout={AdminLayout} component={CategoryFormPage} />
      <LayoutRoute path="/admin/category/:id/edit" layout={AdminLayout} component={CategoryFormPage} />

      {/*Users*/}
      <LayoutRoute exact path="/admin/users" layout={AdminLayout} component={UsersListPage} />
      <LayoutRoute path="/admin/users/create" layout={AdminLayout} component={UsersFormPage} />
      <LayoutRoute path="/admin/users/:id/edit" layout={AdminLayout} component={UsersFormPage} />

    </Switch>
  )
}

export default AdminRoute;
