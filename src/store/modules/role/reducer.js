const initialState = {
  roles: [],
  role: {},
  permissions: []
}

const role = (state = initialState, action ) => {
  switch(action.type) {
    case 'GET_ROLE_SUCCESS': 
      return {
        ...state,
        roles: action.payload,
      }
    case 'CREATE_ROLE_REQUEST':
      return {
        ...state,
        role: {}
      }
    case 'CREATE_ROLE_SUCCESS':
      return {
        ...state,
        permissions: action.payload
      }
    case 'STORE_ROLE_SUCCESS':
      return {
        ...state,
        roles: [...state.roles, action.payload.data]
      }
    case 'EDIT_ROLE_REQUEST':
      return {
        ...state,
        role: {}
      }
    case 'EDIT_ROLE_SUCCESS':
      return {
        ...state,
        role: action.payload.role,
        permissions: action.payload.permissions
      }
    case 'UPDATE_ROLE_SUCCESS':
      const { data } = action.payload
      return {
        ...state,
        role: [],
        roles: state.roles.map(item => item.id === data.id ? data : item )
      }
    case 'DELETE_ROLE_SUCCESS':
      return {
        ...state,
        roles: state.roles.filter(item => item.id !== parseInt(action.payload))
      }
    default: return state;
  }
}

export default role;