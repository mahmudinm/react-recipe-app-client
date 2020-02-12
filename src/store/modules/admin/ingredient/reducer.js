const initialState = {
  ingredients: [],
  ingredient: {}
}

const ingredient = (state = initialState, action ) => {
  switch(action.type) {
    case 'GET_INGREDIENT_SUCCESS': 
      return {
        ...state,
        ingredients: action.payload,
      }
    case 'CREATE_INGREDIENT_REQUEST':
      return {
        ...state,
        ingredient: {}
      }
    case 'STORE_INGREDIENT_SUCCESS':
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload.data]
      }
    case 'EDIT_INGREDIENT_REQUEST':
      return {
        ...state,
        ingredient: {}
      }
    case 'EDIT_INGREDIENT_SUCCESS':
      return {
        ...state,
        ingredient: action.payload
      }
    case 'UPDATE_INGREDIENT_SUCCESS':
      const { data } = action.payload
      return {
        ...state,
        ingredient: [],
        ingredients: state.ingredients.map(item => item.id === data.id ? data : item )
      }
    case 'DELETE_INGREDIENT_SUCCESS':
      return {
        ...state,
        ingredients: state.ingredients.filter(item => item.id !== parseInt(action.payload))
      }
    default: return state;
  }
}

export default ingredient;