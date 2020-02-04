export const getIngredientRequest = () => ({
  type: 'GET_INGREDIENT_REQUEST'
})

export const getIngredientSuccess = (payload) => ({
  type: 'GET_INGREDIENT_SUCCESS',
  payload
})

export const createIngredientRequest = () => ({
  type: 'CREATE_INGREDIENT_REQUEST',
})

export const storeIngredientRequest = (payload, meta, toggle) => ({
  type: 'STORE_INGREDIENT_REQUEST',
  payload,
  meta,
  toggle
})

export const storeIngredientSuccess = (payload) => ({
  type: 'STORE_INGREDIENT_SUCCESS',
  payload,
})

export const editIngredientRequest = (payload) => ({
  type: 'EDIT_INGREDIENT_REQUEST',
  payload // ini id
})

export const editIngredientSuccess = (payload) => ({
  type: 'EDIT_INGREDIENT_SUCCESS',
  payload
})

export const updateIngredientRequest = (payload, id, meta, toggle) => ({
  type: 'UPDATE_INGREDIENT_REQUEST',
  payload,
  id,
  meta,
  toggle
})

export const updateIngredientSuccess = (payload) => ({
  type: 'UPDATE_INGREDIENT_SUCCESS',
  payload,
})

export const deleteIngredientRequest = (payload) => ({
  type: 'DELETE_INGREDIENT_REQUEST',
  payload // ini id 
})

export const deleteIngredientSuccess = (payload) => ({
  type: 'DELETE_INGREDIENT_SUCCESS',
  payload // ini id 
})




