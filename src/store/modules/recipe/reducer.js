const initialState = {
  recipes: [],
  recipe: {},
  next_page_url: ''
}

const recipe = (state = initialState, action ) => {
  switch(action.type) {
    case '@homeRecipe/GET_RECIPE_SUCCESS': 
      return {
        ...state,
        recipes: action.payload.data,
        next_page_url: action.payload.next_page_url,
      }
    case '@homeRecipe/GET_MORE_RECIPE_SUCCESS': 
      return {
        ...state,
        recipes: state.recipes.concat(action.payload.data),
        next_page_url: action.payload.next_page_url
      }
    case '@homeRecipe/SEARCH_RECIPE_SUCCESS': 
      return {
        ...state,
        recipes: action.payload.data,
        next_page_url: action.payload.next_page_url
      }
    default: return state;
  }
}

export default recipe;