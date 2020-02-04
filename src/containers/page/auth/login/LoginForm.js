import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from "components/Formik/TextInput";
import Loader from 'react-loader-spinner'

const LoginForm = ({ handleLogin }) => {

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        password: Yup.string()
          .required('Required')
      })}
      onSubmit={(data, meta) => {
        handleLogin(data, meta);
      }}
    >
      {formik => (
        <Form>
          <TextInput 
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          <TextInput 
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          {formik.status ? <div className="alert alert-danger">{formik.status}</div> : null}
          <button type="submit" className="btn btn-primary btn-block" disabled={formik.isSubmitting}>
            LOGIN
            <Loader
               type="TailSpin"
               color="#FFFFFF"
               height={20}
               width={20}
               style={{ display: 'inline-block', marginLeft: '7px' }}
               visible={formik.isSubmitting}
            />            
          </button>
        </Form>
      )}
    </Formik>

  )

}

export default LoginForm;