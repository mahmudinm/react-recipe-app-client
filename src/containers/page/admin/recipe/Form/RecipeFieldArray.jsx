import React from 'react';
import { FieldArray, getIn } from 'formik';
import { Button } from 'reactstrap';

const RecipeFieldArray = ({ formik, ingredients }) => {
  return (
    <FieldArray name="ingredients">
      {({ push, remove }) => (

        <div>

          <div className="float-right">
            <Button
              color="primary"
              type="button"
              onClick={() =>
                push({ ingredient_id: '', quantity: '' })
              }
            >
              Add Ingredient
            </Button>
          </div>

          <div className="clearfix"></div>
          <hr style={{ marginTop: '1rem', marginBottom: '1rem' }}/>

          <div className="row">
            <div className="col-md-5">
              <label>Select Ingredient</label>
            </div>

            <div className="col-md-5">
              <label>Quantity</label>
            </div>                
          </div>

          <div className="clearfix"></div>

          {formik.values.ingredients.map((p, index) => {
            const ingredient_id = `ingredients[${index}].ingredient_id`;
            const touchedIngredient_id = getIn(formik.touched, ingredient_id);
            const errorsIngredient_id = getIn(formik.errors, ingredient_id);

            const quantity = `ingredients[${index}].quantity`;
            const touchedQuantity = getIn(formik.touched, quantity);
            const errorsQuantity = getIn(formik.errors, quantity);

            return (
              <div key={index} className="row">

                <div className="col-md-5">
                  <div className="form-group">
                    <select 
                      value={p.ingredient_id}
                      name={ingredient_id}
                      className={
                        touchedIngredient_id && errorsIngredient_id ? 'form-control is-invalid' : 'form-control'
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">--Select Ingredient--</option>
                      {ingredients.map((item, key) => 
                        <option value={item.id} key={key}>{item.name}</option>
                      )}
                    </select>
                    { touchedIngredient_id && errorsIngredient_id ? (
                      <div className="invalid-feedback">{errorsIngredient_id}</div>
                    ) : null }                    
                  </div>
                </div>

                <div className="col-md-5">
                  <div className="form-group">
                    <input 
                      type="text"
                      placeholder="Quantity"
                      value={p.quantity}
                      name={quantity}
                      className={
                        touchedQuantity && errorsQuantity ? 'form-control is-invalid' : 'form-control'
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    { touchedQuantity && errorsQuantity ? (
                      <div className="invalid-feedback">{errorsQuantity}</div>
                    ) : null }
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="text-center">
                    <Button
                      color="danger"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      X
                    </Button>
                  </div>
                </div>

              </div>
            )

          })}

        </div>
      )}
    </FieldArray>    
  )
}

export default RecipeFieldArray;