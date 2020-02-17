const initialState = {
  recipes: [],
  recipe: {
    category: {},
    ingredients: []
  },
  categories: [],
  next_page_url: '',
  loading: false
}

const recipe = (state = initialState, action ) => {
  switch(action.type) {
    case '@homeRecipe/GET_RECIPE_REQUEST': 
      return {
        ...state,
        recipes: [],
        loading: true,
      }
    case '@homeRecipe/GET_RECIPE_SUCCESS': 
      return {
        ...state,
        recipes: action.payload.recipes.data,
        categories: action.payload.categories,
        next_page_url: action.payload.recipes.next_page_url,
        loading: false,
      }
    case '@homeRecipe/GET_MORE_RECIPE_SUCCESS': 
      return {
        ...state,
        recipes: state.recipes.concat(action.payload.recipes.data),
        next_page_url: action.payload.recipes.next_page_url
      }
    case '@homeRecipe/SEARCH_RECIPE_SUCCESS': 
      return {
        ...state,
        recipes: action.payload.recipes.data,
        next_page_url: action.payload.recipes.next_page_url
      }
    case '@homeRecipe/SHOW_RECIPE_SUCCESS': 
      return {
        ...state,
        recipe: action.payload,
      }
    case '@homeRecipe/SHOW_RECIPE_UNMOUNT': 
      return {
        ...state,
        recipe: {},
      }
    default: return state;
  }
}

export default recipe;