const initialState = {
  recipes: [],
  recipe: {},
  categories: [],
  ingredients: []
}

const recipe = (state = initialState, action ) => {
  switch(action.type) {
    case 'GET_RECIPE_SUCCESS': 
      return {
        ...state,
        recipes: action.payload,
      }
    case 'CREATE_RECIPE_REQUEST':
      return {
        ...state,
        recipe: {}
      }
    case 'CREATE_RECIPE_SUCCESS':
      return {
        ...state,
        categories: action.payload.categories,
        ingredients: action.payload.ingredients
      }
    case 'STORE_RECIPE_SUCCESS':
      return {
        ...state,
        recipes: [...state.recipes, action.payload.data]
      }
    case 'EDIT_RECIPE_REQUEST':
      return {
        ...state,
        recipe: {}
      }
    case 'EDIT_RECIPE_SUCCESS':
      return {
        ...state,
        recipe: action.payload.recipe,
        categories: action.payload.categories,
        ingredients: action.payload.ingredients
      }
    case 'UPDATE_RECIPE_SUCCESS':
      const { data } = action.payload
      return {
        ...state,
        recipe: [],
        recipes: state.recipes.map(item => item.id === data.id ? data : item )
      }
    case 'DELETE_RECIPE_SUCCESS':
      return {
        ...state,
        recipes: state.recipes.filter(item => item.id !== parseInt(action.payload))
      }
    default: return state;
  }
}

export default recipe;