import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import AdminFooter from "components/Footers/AdminFooter.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";


const Admin = (props) => {
  return (
    <>
      <Sidebar
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("assets/img/brand/argon-react.png"),
          imgAlt: "..."
        }}
      />
      <div className="main-content">
        <AdminNavbar
        />
        {props.children}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
  
}

export default Admin;