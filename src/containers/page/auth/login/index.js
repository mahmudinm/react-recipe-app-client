import React from "react";
import { useDispatch } from 'react-redux';
import { loginRequest } from "store/modules/auth/actions";
import LoginForm from './LoginForm';
import {
  Card,
  CardBody,
  Col
} from "reactstrap";

const LoginPage = () => {

  const dispatch = useDispatch()

  const handleLogin = (data, meta) => {
    dispatch(loginRequest(data, meta))
  }

  return (
    <React.Fragment>
      <Col lg="5" md="7">
        <Card className="shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h2>Halaman Login</h2>
            </div>

            <LoginForm handleLogin={handleLogin} />

          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
}

export default LoginPage;