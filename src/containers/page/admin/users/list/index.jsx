import React from 'react';

import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

import Header from "components/Headers/Header.jsx";

const UserListPage = () => {
	return (
      <>
        <Header />      
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Users</h3>
                </CardHeader>
                <CardBody>
                  <Row className=" icon-examples">
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>		
	)
}

export default UserListPage;