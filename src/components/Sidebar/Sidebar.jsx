import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from 'react-redux';
import { logout } from "store/modules/auth/actions";
import jwt from 'jwt-decode'
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";


class Sidebar extends React.Component {

  state = {
    collapseOpen: false
  }
  
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  }
  
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  }

  handleLogout = () => {
    this.props.logout();
  }

  render() {
    const { isAuthenticated, token } = this.props;

    // Implement Role base access list
    let jwtDecode; 
    if (token !== null) {
      jwtDecode = jwt(token);
    }    

    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <NavbarBrand className="pt-3 pb-0" tag={Link} to="/">
            Resep Makanan
          </NavbarBrand>
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  {isAuthenticated ? jwtDecode.name : 'Belum login'}
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem href="#pablo" onClick={this.handleLogout}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>  
                <Col className="collapse-brand" xs="6">
                  <Link to="/">Resep Makanan</Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>

            {/* Navigation */}
            {isAuthenticated &&
              <Nav navbar>
                {(jwtDecode.roles.toString() === 'staff' || jwtDecode.roles.toString() === 'admin') &&
                  <NavItem>
                    <NavLink
                      to={'/admin/recipe'}
                      onClick={this.closeCollapse}
                      tag={NavLinkRRD}
                      activeClassName="active"
                    >
                      <i className="ni ni-tv-2 text-primary" />
                      Recipe
                    </NavLink>
                  </NavItem> 
                }

                {jwtDecode.roles.toString() === 'admin' &&
                  <React.Fragment>
                    <NavItem>
                      <NavLink
                        to={'/admin/category'}
                        onClick={this.closeCollapse}
                        tag={NavLinkRRD}
                        activeClassName="active"
                      >
                        <i className="ni ni-tv-2 text-primary" />
                        Category
                      </NavLink>
                    </NavItem> 
                    <NavItem>
                      <NavLink
                        to={'/admin/ingredient'}
                        onClick={this.closeCollapse}
                        tag={NavLinkRRD}
                        activeClassName="active"
                      >
                        <i className="ni ni-tv-2 text-primary" />
                        Ingredient
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to={'/admin/user'}
                        onClick={this.closeCollapse}
                        tag={NavLinkRRD}
                        activeClassName="active"
                      >
                        <i className="ni ni-tv-2 text-primary" />
                        User
                      </NavLink>
                    </NavItem>              
                    <NavItem>   
                      <NavLink
                        to={'/admin/role'}
                        onClick={this.closeCollapse}
                        tag={NavLinkRRD}
                        activeClassName="active"
                      >
                        <i className="ni ni-tv-2 text-primary" />
                        Role
                      </NavLink>
                    </NavItem>                      
                    <NavItem>
                      <NavLink
                        to={'/admin/permission'}
                        onClick={this.closeCollapse}
                        tag={NavLinkRRD}
                        activeClassName="active"
                      >
                        <i className="ni ni-tv-2 text-primary" />
                        Permission
                      </NavLink>
                    </NavItem>                   
                  </React.Fragment>
                }
              </Nav>
            }
            
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
