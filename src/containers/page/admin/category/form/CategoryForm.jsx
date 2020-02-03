import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from "components/Formik/TextInput";
import { Button } from 'reactstrap';

const CategoryForm = ({ toggle, category, storeCategory }) => {

  const initialValues = {
    name: ''
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Required')
      })}
      onSubmit={(data, actions) => {
        if(!data.id) {
          storeCategory(data, actions, toggle)
        } else {
          // storeCategory(data, actions)
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