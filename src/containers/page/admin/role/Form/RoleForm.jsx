import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from "components/Formik/TextInput";
import { Button } from 'reactstrap';
import Loader from 'react-loader-spinner'

const RoleForm = ({ toggle, storeRole, updateRole }) => {

  const role = useSelector(state => state.role.role); // untuk mengambil hasil action dari handleModal untuk create dan update

  const initialValues = {
    name: ''
  };

  return (
    <Formik
      initialValues={role.id ? role : initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Required')
      })}
      enableReinitialize={true} // gunakan jika tidak ingin menggunakan toggle pada redux saga
      onSubmit={(data, actions) => {
        if(!data.id) {
          storeRole(data, actions, toggle)
        } else {
          updateRole(data, data.id, actions, toggle)
        }
      }}
    >
      {formik => (
        <Form>
          <TextInput
            label="Role name"
            type="text"
            name="name"
            placeholder="Enter name of Role"
          />
          <div className="float-right">
            <Button type="submit" color="primary" disabled={formik.isSubmitting}>
              { role.id ? 'UPDATE' : 'SAVE' }            
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

export default RoleForm;