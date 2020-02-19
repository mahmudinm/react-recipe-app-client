import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from "components/Formik/TextInput";
import { SelectInput } from "components/Formik/SelectInput";
import { TextAreaInput } from "components/Formik/TextAreaInput";
import { FileInput } from "components/Formik/FileInput";
import { Button } from 'reactstrap';
import Loader from 'react-loader-spinner'
import RecipeFieldArray from './RecipeFieldArray';

const RecipeForm = ({ toggle, storeRecipe, updateRecipe }) => {

  const recipe = useSelector(state => state.recipe.recipe); // mengambil data dari redux untuk edit update
  const ingredients = useSelector(state => state.recipe.ingredients); 
  const categories = useSelector(state => state.recipe.categories); 
  const FILE_SIZE = 3000 * 1024;
  const SUPPORTED_FORMATS = [ // validasi tipe gambar
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ]

  const initialValues = {
    name: '',
    image: '',
    step: '',
    category_id: '',
    ingredients: [
      {
        ingredient_id: '',
        quantity: ''
      }
    ]
  };

  // buat custom data untuk edit karena data pivot tak bisa langsung di panggil
  let editData = {};  
  if (recipe.id) {
    editData = {
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      step: recipe.step,
      category_id: recipe.category_id,
      ingredients: recipe.ingredients.map((item) => {
        return { ingredient_id: item.pivot.ingredient_id, quantity: item.pivot.quantity }
      })
    };
  };

  return (
    <Formik
      initialValues={editData.id ? editData : initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Required'),
        image: editData.id ? null : Yup.mixed()
          .required('Required')
          .test("fileSize", 
                "File Is To Large", 
                value => value && value.size <= FILE_SIZE )
          .test("fileFormat",
                "Unsupported Format",
                value => value && SUPPORTED_FORMATS.includes(value.type)),
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
        // console.log(data);
        if(!data.id) {
          storeRecipe(data, meta, toggle)
        } else {
          updateRecipe(data, data.id, meta, toggle)
        }
      }}
    >
      {formik => (
        <Form>
          <FileInput
            label={
              editData.id ? "Image ('biarkan bilak tidak mau ganti gambar')" : "Image"
            }
            name="image"
            value={formik.values.image}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            error={formik.errors.image}
            touched={formik.touched.image}
          />
          {editData.image &&
            <img 
                src={`${process.env.REACT_APP_URL}/image/${formik.values.image}`} 
                alt={formik.values.image} 
                className="rounded mb-2"
                style={{ width: '200px', objectFit: 'cover' }}
            />
          }
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