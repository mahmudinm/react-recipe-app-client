export const getRecipeRequest = () => ({
  type: 'GET_RECIPE_REQUEST'
})

export const getRecipeSuccess = (payload) => ({
  type: 'GET_RECIPE_SUCCESS',
  payload
})

export const createRecipeRequest = () => ({
  type: 'CREATE_RECIPE_REQUEST',
})

export const createRecipeSuccess = (payload) => ({
  type: 'CREATE_RECIPE_SUCCESS',
  payload
})

export const storeRecipeRequest = (payload, meta, toggle) => ({
  type: 'STORE_RECIPE_REQUEST',
  payload,
  meta,
  toggle
})

export const storeRecipeSuccess = (payload) => ({
  type: 'STORE_RECIPE_SUCCESS',
  payload,
})

export const editRecipeRequest = (payload) => ({
  type: 'EDIT_RECIPE_REQUEST',
  payload // ini id
})

export const editRecipeSuccess = (payload) => ({
  type: 'EDIT_RECIPE_SUCCESS',
  payload
})

export const updateRecipeRequest = (payload, id, meta, toggle) => ({
  type: 'UPDATE_RECIPE_REQUEST',
  payload,
  id,
  meta,
  toggle
})

export const updateRecipeSuccess = (payload) => ({
  type: 'UPDATE_RECIPE_SUCCESS',
  payload,
})

export const deleteRecipeRequest = (payload) => ({
  type: 'DELETE_RECIPE_REQUEST',
  payload // ini id 
})

export const deleteRecipeSuccess = (payload) => ({
  type: 'DELETE_RECIPE_SUCCESS',
  payload // ini id 
})




