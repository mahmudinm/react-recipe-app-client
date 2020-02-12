const initialState = {
  recipes: [],
  recipe: {},
  current_page: 1,
  last_page: 2,
}

const recipe = (state = initialState, action ) => {
  switch(action.type) {
    case '@homeRecipe/GET_RECIPE_SUCCESS': 
      return {
        ...state,
        recipes: action.payload.data,
        current_page: action.payload.current_page,
        last_page: action.payload.last_page
      }
    case '@homeRecipe/GET_MORE_RECIPE_SUCCESS': 
      return {
        ...state,
        recipes: state.recipes.concat(action.payload.data),
        current_page: action.payload.current_page
      }
    default: return state;
  }
}

export default recipe;