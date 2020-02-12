export const getCategoryRequest = () => ({
  type: 'GET_CATEGORY_REQUEST'
})

export const getCategorySuccess = (payload) => ({
  type: 'GET_CATEGORY_SUCCESS',
  payload
})

export const createCategoryRequest = () => ({
  type: 'CREATE_CATEGORY_REQUEST',
})

export const storeCategoryRequest = (payload, meta, toggle) => ({
  type: 'STORE_CATEGORY_REQUEST',
  payload,
  meta,
  toggle
})

export const storeCategorySuccess = (payload) => ({
  type: 'STORE_CATEGORY_SUCCESS',
  payload,
})

export const editCategoryRequest = (payload) => ({
  type: 'EDIT_CATEGORY_REQUEST',
  payload // ini id
})

export const editCategorySuccess = (payload) => ({
  type: 'EDIT_CATEGORY_SUCCESS',
  payload
})

export const updateCategoryRequest = (payload, id, meta, toggle) => ({
  type: 'UPDATE_CATEGORY_REQUEST',
  payload,
  id,
  meta,
  toggle
})

export const updateCategorySuccess = (payload) => ({
  type: 'UPDATE_CATEGORY_SUCCESS',
  payload,
})

export const deleteCategoryRequest = (payload) => ({
  type: 'DELETE_CATEGORY_REQUEST',
  payload // ini id 
})

export const deleteCategorySuccess = (payload) => ({
  type: 'DELETE_CATEGORY_SUCCESS',
  payload // ini id 
})




