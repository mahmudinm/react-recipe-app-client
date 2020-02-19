import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
// import toast
import 'react-toastify/dist/ReactToastify.css';
// import assets 
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
// Import Bootstrap
import $ from 'jquery'; // eslint-disable-line
import 'bootstrap/dist/js/bootstrap.min.js'; 
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
        <ToastContainer autoClose={2500} />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
