import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from "components/Formik/TextInput";
import { Button } from 'reactstrap';
import Loader from 'react-loader-spinner'

const IngredientForm = ({ toggle, storeIngredient, updateIngredient }) => {

  const ingredient = useSelector(state => state.ingredient.ingredient); // untuk mengambil hasil action dari handleModal untuk create dan update

  const initialValues = {
    name: ''
  };

  return (
    <Formik
      initialValues={ingredient.id ? ingredient : initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Required')
      })}
      enableReinitialize={true} // gunakan jika tidak ingin menggunakan toggle pada redux saga
      onSubmit={(data, actions) => {
        if(!data.id) {
          storeIngredient(data, actions, toggle)
        } else {
          updateIngredient(data, data.id, actions, toggle)
        }
      }}
    >
      {formik => (
        <Form>
          <TextInput
            label="Ingredient name"
            type="text"
            name="name"
            placeholder="Enter name of ingredient"
          />
          <div className="float-right">
            <Button type="submit" color="primary" disabled={formik.isSubmitting}>
              { ingredient.id ? 'UPDATE' : 'SAVE' }            
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

export default IngredientForm;