export const getRoleRequest = () => ({
  type: 'GET_ROLE_REQUEST'
})

export const getRoleSuccess = (payload) => ({
  type: 'GET_ROLE_SUCCESS',
  payload
})

export const createRoleRequest = () => ({
  type: 'CREATE_ROLE_REQUEST',
})

export const createRoleSuccess = (payload) => ({
  type: 'CREATE_ROLE_SUCCESS',
  payload
})

export const storeRoleRequest = (payload, meta, toggle) => ({
  type: 'STORE_ROLE_REQUEST',
  payload,
  meta,
  toggle
})

export const storeRoleSuccess = (payload) => ({
  type: 'STORE_ROLE_SUCCESS',
  payload,
})

export const editRoleRequest = (payload) => ({
  type: 'EDIT_ROLE_REQUEST',
  payload // ini id
})

export const editRoleSuccess = (payload) => ({
  type: 'EDIT_ROLE_SUCCESS',
  payload
})

export const updateRoleRequest = (payload, id, meta, toggle) => ({
  type: 'UPDATE_ROLE_REQUEST',
  payload,
  id,
  meta,
  toggle
})

export const updateRoleSuccess = (payload) => ({
  type: 'UPDATE_ROLE_SUCCESS',
  payload,
})

export const deleteRoleRequest = (payload) => ({
  type: 'DELETE_ROLE_REQUEST',
  payload // ini id 
})

export const deleteRoleSuccess = (payload) => ({
  type: 'DELETE_ROLE_SUCCESS',
  payload // ini id 
})




