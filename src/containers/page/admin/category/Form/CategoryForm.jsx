import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from "components/Formik/TextInput";
import { Button } from 'reactstrap';
import Loader from 'react-loader-spinner'

const CategoryForm = ({ toggle, storeCategory, updateCategory }) => {

  const category = useSelector(state => state.category.category); // untuk mengambil hasil action dari handleModal untuk create dan update

  const initialValues = {
    name: ''
  };

  return (
    <Formik
      initialValues={category.id ? category : initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Required')
      })}
      enableReinitialize={true} // gunakan jika tidak ingin menggunakan toggle pada redux saga
      onSubmit={(data, actions) => {
        if(!data.id) {
          storeCategory(data, actions, toggle)
        } else {
          updateCategory(data, data.id, actions, toggle)
        }
      }}
    >
      {formik => (
        <Form>
          <TextInput
            label="Category name"
            type="text"
            name="name"
            placeholder="Enter name of category"
          />
          <div className="float-right">
            <Button type="submit" color="primary" disabled={formik.isSubmitting}>
              { category.id ? 'UPDATE' : 'SAVE' }            
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

export default CategoryForm;