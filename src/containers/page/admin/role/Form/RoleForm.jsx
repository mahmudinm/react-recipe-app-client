import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from "components/Formik/TextInput";
import { SelectInput } from "components/Formik/SelectInput";
import { Button } from 'reactstrap';
import Loader from 'react-loader-spinner'

const RoleForm = ({ toggle, storeRole, updateRole }) => {

  const role = useSelector(state => state.role.role); // mengambil data dari redux untuk edit update
  const permissions = useSelector(state => state.role.permissions); // mengambil data permission dari redux untuk react-select 
  // buat options untuk react-select dengan perulangan map
  let options = permissions.map((permission) => {
    return { value: permission.id, label: permission.name }
  });

  let editData = []; // buat data kosong untuk data edit dan update

  // jika edit maka di eksekusi 
  if (role.id) {
    // buat custom data sendiri untuk update / edit
    editData = {
      id: role.id,
      name: role.name,
      permissions: role.permissions.map((permission) => {
        return { value: permission.id, label: permission.name }
      })
    }
  }

  const initialValues = {
    name: '',
    permissions: []
  };

  return (
    <Formik
      initialValues={editData.id ? editData : initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Required'),
        permissions: Yup.array()
          .min(1, 'Pick at least 3 tags')
          .of(
            Yup.object().shape({
              value: Yup.string().required(),
              label: Yup.string().required(),
            })
          ),
      })}
      enableReinitialize={true} // gunakan jika tidak ingin menggunakan toggle secara async pada redux saga
      onSubmit={(data, actions) => {
        console.log(data);
        // if(!data.id) {
        //   // storeRole(data, actions, toggle)
        //   console.log(data);
        // } else {
        //   // updateRole(data, data.id, actions, toggle)
        // }
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
          <SelectInput
            label="Select Permissions"
            name="permissions"
            options={options}
            value={formik.values.permissions}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            error={formik.errors.permissions}
            touched={formik.touched.permissions}
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