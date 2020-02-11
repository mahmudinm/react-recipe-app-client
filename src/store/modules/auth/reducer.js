const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false
}

const auth = (state = initialState, action ) => {
  switch(action.type) {
    case 'LOGIN_REQUEST': 
      return {
        ...state,
        loading: true,
      }
    case 'LOGIN_FAILURE': 
      return {
        ...state,
        loading: false,
      }
    case 'LOGIN_SUCCESS': 
      return {
        ...state,
        token: action.payload,
        loading: false,
        isAuthenticated: true,
      }
    case 'LOGOUT': 
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      }
    case 'REFRESH_TOKEN_SUCCESS': 
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true
      }
    default: return state;
  }
}

export default auth;