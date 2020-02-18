import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

const AdminNavbar = () => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <>
      <Navbar
        expand="md"
        className="shadow"
        style={{ background: 'white' }}
        light
      >
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link} style={{ fontSize: '22px' }}>
            Resep Makanan
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    id="navbar-collapse-main"
                  >
                    <span />
                    <span />
                  </button>
                </Col>                
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? 
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/admin/recipe"
                    tag={Link}
                  >
                    <span className="nav-link-inner--text">Dashboard</span>
                  </NavLink>
                </NavItem> :
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/auth/login"
                    tag={Link}
                  >
                    <span className="nav-link-inner--text">Login</span>
                  </NavLink>
                </NavItem>
              }
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
