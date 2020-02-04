import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from "components/Formik/TextInput";
import { Button } from 'reactstrap';
import Loader from 'react-loader-spinner'

const PermissionForm = ({ toggle, storePermission, updatePermission }) => {

  const permission = useSelector(state => state.permission.permission); // untuk mengambil hasil action dari handleModal untuk create dan update

  const initialValues = {
    name: ''
  };

  return (
    <Formik
      initialValues={permission.id ? permission : initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Required')
      })}
      enableReinitialize={true} // gunakan jika tidak ingin menggunakan toggle pada redux saga
      onSubmit={(data, actions) => {
        if(!data.id) {
          storePermission(data, actions, toggle)
        } else {
          updatePermission(data, data.id, actions, toggle)
        }
      }}
    >
      {formik => (
        <Form>
          <TextInput
            label="Permission name"
            type="text"
            name="name"
            placeholder="Enter name of permission"
          />
          <div className="float-right">
            <Button type="submit" color="primary" disabled={formik.isSubmitting}>
              { permission.id ? 'UPDATE' : 'SAVE' }            
              <Loader
                 type="TailSpin"
                 color="#FFFFFF"
                 height={20}
                 width={20}
                 style={{ display: 'inline-block', marginLeft: '7px' }}
                 visible={formik.isSubmitting}
              />            
            </Button>
            <Button color="secondary" onClick={toggle}>
              Close
            </Button>          
          </div>
        </Form>
      )}
    </Formik>
  )

}

export default PermissionForm;