import React, { Component, Fragment } from "react";
// reactstrap components
import { Container, Row } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.jsx";


class Main extends Component {

  render() {
    return (
      <Fragment>
        <AuthNavbar />
        {/* Page content */}
        <Container className="mt-6">
          <Row className="justify-content-center">
            {this.props.children}
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Main;
