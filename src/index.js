import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminRoute from "routes/Admin";
import MainRoute from "routes/Main";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <MainRoute />
   		<AdminRoute />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
