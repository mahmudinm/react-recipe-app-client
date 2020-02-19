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
      <LayoutRoute exact 
          path="/admin/recipe" 
          layout={AdminLayout} 
          component={withAuth(RecipeListPage, ['admin', 'staff'])} />
    
      {/*Category Page*/}
      <LayoutRoute exact 
          path="/admin/category"
          layout={AdminLayout} 
          component={withAuth(CategoryListPage, ['admin'])} />

      {/*Ingredient Page*/}
      <LayoutRoute exact 
          path="/admin/ingredient"
          layout={AdminLayout} 
          component={withAuth(IngredientListPage, ['admin'])} />

      {/*User Page*/}
      <LayoutRoute exact 
          path="/admin/user"
          layout={AdminLayout} 
          component={withAuth(UserListPage, ['admin'])} />

      {/*Permission Page*/}
      <LayoutRoute exact 
          path="/admin/permission"
          layout={AdminLayout} 
          component={withAuth(PermissionListPage, ['admin'])} />

      {/*Permission Page*/}
      <LayoutRoute exact 
          path="/admin/role"
          layout={AdminLayout} 
          component={withAuth(RoleListPage, ['admin'])} />


    </Switch>
  )
}

export default AdminRoute;