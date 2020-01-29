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
    default: return state;
  }
}

export default category;