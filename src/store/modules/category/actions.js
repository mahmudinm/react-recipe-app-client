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

export const createCategorySuccess = (payload) => ({
  type: 'CREATE_CATEGORY_SUCCESS',
  payload
})

export const editCategory = (payload) => ({
  type: 'EDIT_CATEGORY',
  payload
})

export const updateCategory = (payload) => ({
  type: 'UPDATE_CATEGORY',
  payload
})

export const removeCategory = (payload) => ({
  type: 'REMOVE_CATEGORY',
  payload
})




