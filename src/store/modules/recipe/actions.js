export const getRecipeRequest = (payload, setHasMore) => ({
  type: '@homeRecipe/GET_RECIPE_REQUEST',
  payload,
  setHasMore
})

export const getRecipeSuccess = (payload) => ({
  type: '@homeRecipe/GET_RECIPE_SUCCESS',
  payload
})

export const getMoreRecipeRequest = (payload, setHasMore) => ({
  type: '@homeRecipe/GET_MORE_RECIPE_REQUEST',
  payload,
  setHasMore
})

export const getMoreRecipeSuccess = (payload) => ({
  type: '@homeRecipe/GET_MORE_RECIPE_SUCCESS',
  payload
})

export const searchRecipeRequest = (payload, setHasMore) => ({
  type: '@homeRecipe/SEARCH_RECIPE_REQUEST',
  payload,
  setHasMore
})

export const searchRecipeSuccess = (payload) => ({
  type: '@homeRecipe/SEARCH_RECIPE_SUCCESS',
  payload
})

export const showRecipeRequest = (payload) => ({
  type: '@homeRecipe/SHOW_RECIPE_REQUEST',
  payload
})

export const showRecipeSuccess = (payload) => ({
  type: '@homeRecipe/SHOW_RECIPE_SUCCESS',
  payload
})

export const showRecipeUnmount = () => ({
  type: '@homeRecipe/SHOW_RECIPE_UNMOUNT',
})

