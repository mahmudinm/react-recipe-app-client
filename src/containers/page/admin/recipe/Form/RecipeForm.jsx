import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';
import { TextInput } from "components/Formik/TextInput";
import { SelectInput } from "components/Formik/SelectInput";
import { TextAreaInput } from "components/Formik/TextAreaInput";
import { Button } from 'reactstrap';
import Loader from 'react-loader-spinner'
import RecipeFieldArray from './RecipeFieldArray';

const RecipeForm = ({ toggle, storeRecipe, updateRecipe }) => {

  const recipe = useSelector(state => state.recipe.recipe); // mengambil data dari redux untuk edit update
  const ingredients = useSelector(state => state.recipe.ingredients); 
  const categories = useSelector(state => state.recipe.categories); 

  const initialValues = {
    name: '',
    image: '',
    step: '',
    category_id: '',
    ingredients: [
      {
        ingredient_id: 2,
        quantity: 'asdasd'
      },
      {
        ingredient_id: 1,
        quantity: 'asdasd'
      }
    ]
  };

  return (
    <Formik
      initialValues={recipe.id ? recipe : initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Required'),
        category_id: Yup.string()
          .required('Required'),
        step: Yup.string()
          .required('Required'),
        ingredients: Yup.array().of(
          Yup.object().shape({
            ingredient_id: Yup.string()
                .required('Required'),
            quantity: Yup.string()
                .required('Required'),
          })
        ),
      })}
      enableReinitialize={true} // gunakan jika tidak ingin menggunakan toggle pada redux saga
      onSubmit={(data, meta) => {
        console.log(data);
        // if(!data.id) {
        //   storeRecipe(data, meta, toggle)
        // } else {
        //   updateRecipe(data, data.id, meta, toggle)
        // }
      }}
    >
      {formik => (
        <Form>

          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input 
              type="file" 
              name="image" 
              className="form-control" 
              onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0])}
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <TextInput
                label="Name"
                type="text"
                name="name"
                placeholder="Enter name of user"
              />
            </div>
            <div className="col-md-6">
              <SelectInput
                label="Select Category"
                name="category_id"
              >
                <option value="">---Select Category---</option>
                {categories.map((item, key) => 
                  <option value={item.id} key={key}>{item.name}</option>
                )}
              </SelectInput>
            </div>          
          </div>
          <TextAreaInput
            name="step"
            label="Langkah/Step recipe"
          />
          <RecipeFieldArray
            formik={formik}
            ingredients={ingredients}
          />
          <div className="float-right">
            <Button type="submit" color="primary" disabled={formik.isSubmitting}>
              { recipe.id ? 'UPDATE' : 'SAVE' }            
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

export default RecipeForm;