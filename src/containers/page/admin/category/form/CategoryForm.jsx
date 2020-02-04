import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from "components/Formik/TextInput";
import { Button } from 'reactstrap';

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
        console.log(data);
        console.log(category);
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
            label="Category"
            type="text"
            name="name"
            placeholder="Enter name of category"
          />
          <div className="float-right">
            <Button type="submit" color="primary" disabled={formik.isSubmitting}>
              Save
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