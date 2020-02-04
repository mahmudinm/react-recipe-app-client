import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
// Import spinner
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import history from './utils/history';

import { store, persistor } from './store';

import AdminRoute from "routes/Admin";
import MainRoute from "routes/Main";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <MainRoute />
        <AdminRoute />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
