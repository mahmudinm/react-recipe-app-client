const initialState = {
  categories: [],
  category: {}
}

const category = (state = initialState, action ) => {
  switch(action.type) {
    case 'GET_CATEGORY_SUCCESS': 
      return {
        ...state,
        categories: action.payload,
      }
    case 'CREATE_CATEGORY_REQUEST':
      return {
        ...state,
        category: {}
      }
    case 'STORE_CATEGORY_SUCCESS':
      return {
        ...state,
        categories: [...state.categories, action.payload.data]
      }
    case 'EDIT_CATEGORY_REQUEST':
      return {
        ...state,
        category: {}
      }
    case 'EDIT_CATEGORY_SUCCESS':
      return {
        ...state,
        category: action.payload
      }
    case 'UPDATE_CATEGORY_SUCCESS':
      const { data } = action.payload
      return {
        ...state,
        category: [],
        categories: state.categories.map(item => item.id === data.id ? data : item )
      }
    case 'DELETE_CATEGORY_SUCCESS':
      return {
        ...state,
        categories: state.categories.filter(item => item.id !== parseInt(action.payload))
      }
    default: return state;
  }
}

export default category;