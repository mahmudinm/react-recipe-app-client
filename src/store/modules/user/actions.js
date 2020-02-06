export const getUserRequest = () => ({
  type: 'GET_USER_REQUEST'
})

export const getUserSuccess = (payload) => ({
  type: 'GET_USER_SUCCESS',
  payload
})

export const createUserRequest = () => ({
  type: 'CREATE_USER_REQUEST',
})

export const createUserSuccess = (payload) => ({
  type: 'CREATE_USER_SUCCESS',
  payload
})

export const storeUserRequest = (payload, meta, toggle) => ({
  type: 'STORE_USER_REQUEST',
  payload,
  meta,
  toggle
})

export const storeUserSuccess = (payload) => ({
  type: 'STORE_USER_SUCCESS',
  payload,
})

export const editUserRequest = (payload) => ({
  type: 'EDIT_USER_REQUEST',
  payload // ini id
})

export const editUserSuccess = (payload) => ({
  type: 'EDIT_USER_SUCCESS',
  payload
})

export const updateUserRequest = (payload, id, meta, toggle) => ({
  type: 'UPDATE_USER_REQUEST',
  payload,
  id,
  meta,
  toggle
})

export const updateUserSuccess = (payload) => ({
  type: 'UPDATE_USER_SUCCESS',
  payload,
})

export const deleteUserRequest = (payload) => ({
  type: 'DELETE_USER_REQUEST',
  payload // ini id 
})

export const deleteUserSuccess = (payload) => ({
  type: 'DELETE_USER_SUCCESS',
  payload // ini id 
})




