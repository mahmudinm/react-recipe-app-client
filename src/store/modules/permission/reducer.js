const initialState = {
  permissions: [],
  permission: {}
}

const permission = (state = initialState, action ) => {
  switch(action.type) {
    case 'GET_PERMISSION_SUCCESS': 
      return {
        ...state,
        permissions: action.payload,
      }
    case 'CREATE_PERMISSION_REQUEST':
      return {
        ...state,
        permission: {}
      }
    case 'STORE_PERMISSION_SUCCESS':
      return {
        ...state,
        permissions: [...state.permissions, action.payload.data]
      }
    case 'EDIT_PERMISSION_REQUEST':
      return {
        ...state,
        permission: {}
      }
    case 'EDIT_PERMISSION_SUCCESS':
      return {
        ...state,
        permission: action.payload
      }
    case 'UPDATE_PERMISSION_SUCCESS':
      const { data } = action.payload
      return {
        ...state,
        permission: [],
        permissions: state.permissions.map(item => item.id === data.id ? data : item )
      }
    case 'DELETE_PERMISSION_SUCCESS':
      return {
        ...state,
        permissions: state.permissions.filter(item => item.id !== parseInt(action.payload))
      }
    default: return state;
  }
}

export default permission;