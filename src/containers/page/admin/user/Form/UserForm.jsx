import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from "components/Formik/TextInput";
import { ReactSelectInput } from "components/Formik/ReactSelectInput";
import { Button } from 'reactstrap';
import Loader from 'react-loader-spinner'

const UserForm = ({ toggle, storeUser, updateUser }) => {

  const user = useSelector(state => state.user.user); // mengambil data dari redux untuk edit update
  const roles = useSelector(state => state.user.roles); // mengambil data role dari redux untuk react-select 

  const initialValues = {
    name: '',
    email: '',
    password: '',
    roles: []
  };

  // buat options untuk react-select dengan perulangan map
  let options = roles.map((role) => {
    return { value: role.id, label: role.name }
  });

  let editData = {}; // buat data kosong untuk data edit dan update

  // jika edit maka di eksekusi 
  if (user.id) {
    // buat custom data sendiri untuk update / edit
    editData = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: '',
      roles: user.roles.map((role) => {
        return { value: role.id, label: role.name }
      })
    }
  }  

  return (
    <Formik
      initialValues={editData.id ? editData : initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Required'),
        email: Yup.string()
          .email('Must be an email')
          .required('Required'),
        password: editData.id ? null : Yup.string().required('Required'),
        roles: Yup.array()
          .min(1, 'Pick at least 1 tags')
          .of(
            Yup.object().shape({
              value: Yup.string().required(),
              label: Yup.string().required(),
            })
          ),          
      })}
      enableReinitialize={true} // gunakan jika tidak ingin menggunakan toggle pada redux saga
      onSubmit={(data, meta) => {
        if(!data.id) {
          storeUser(data, meta, toggle)
        } else {
          updateUser(data, data.id, meta, toggle)
        }
      }}
    >
      {formik => (
        <Form>
          <TextInput
            label="Name"
            type="text"
            name="name"
            placeholder="Enter name of user"
          />
          <TextInput
            label="Email"
            type="email"
            name="email"
            placeholder="Enter email of user"
          />
          <TextInput
            label="Password"
            type="password"
            name="password"
            placeholder="Enter password of user"
          />
          <ReactSelectInput
            label="Select Roles"
            name="roles"
            options={options}
            value={formik.values.roles}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            error={formik.errors.roles}
            touched={formik.touched.roles}
          />
          <div className="float-right">
            <Button type="submit" color="primary" disabled={formik.isSubmitting}>
              { user.id ? 'UPDATE' : 'SAVE' }            
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

export default UserForm;