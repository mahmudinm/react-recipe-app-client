const initialState = {
  users: [],
  user: {}
}

const user = (state = initialState, action ) => {
  switch(action.type) {
    case 'GET_USER_SUCCESS': 
      return {
        ...state,
        users: action.payload,
      }
    case 'CREATE_USER_REQUEST':
      return {
        ...state,
        user: {}
      }
    case 'STORE_USER_SUCCESS':
      return {
        ...state,
        users: [...state.users, action.payload.data]
      }
    case 'EDIT_USER_REQUEST':
      return {
        ...state,
        user: {}
      }
    case 'EDIT_USER_SUCCESS':
      return {
        ...state,
        user: action.payload
      }
    case 'UPDATE_USER_SUCCESS':
      const { data } = action.payload
      return {
        ...state,
        user: [],
        users: state.users.map(item => item.id === data.id ? data : item )
      }
    case 'DELETE_USER_SUCCESS':
      return {
        ...state,
        users: state.users.filter(item => item.id !== parseInt(action.payload))
      }
    default: return state;
  }
}

export default user;