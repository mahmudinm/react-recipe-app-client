export const getPermissionRequest = () => ({
  type: 'GET_PERMISSION_REQUEST'
})

export const getPermissionSuccess = (payload) => ({
  type: 'GET_PERMISSION_SUCCESS',
  payload
})

export const createPermissionRequest = () => ({
  type: 'CREATE_PERMISSION_REQUEST',
})

export const storePermissionRequest = (payload, meta, toggle) => ({
  type: 'STORE_PERMISSION_REQUEST',
  payload,
  meta,
  toggle
})

export const storePermissionSuccess = (payload) => ({
  type: 'STORE_PERMISSION_SUCCESS',
  payload,
})

export const editPermissionRequest = (payload) => ({
  type: 'EDIT_PERMISSION_REQUEST',
  payload // ini id
})

export const editPermissionSuccess = (payload) => ({
  type: 'EDIT_PERMISSION_SUCCESS',
  payload
})

export const updatePermissionRequest = (payload, id, meta, toggle) => ({
  type: 'UPDATE_PERMISSION_REQUEST',
  payload,
  id,
  meta,
  toggle
})

export const updatePermissionSuccess = (payload) => ({
  type: 'UPDATE_PERMISSION_SUCCESS',
  payload,
})

export const deletePermissionRequest = (payload) => ({
  type: 'DELETE_PERMISSION_REQUEST',
  payload // ini id 
})

export const deletePermissionSuccess = (payload) => ({
  type: 'DELETE_PERMISSION_SUCCESS',
  payload // ini id 
})




