export const getRecipeRequest = (payload) => ({
  type: '@homeRecipe/GET_RECIPE_REQUEST',
  payload,
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

export const showRecipeRequest = (payload, meta) => ({
  type: '@homeRecipe/LOGIN_REQUEST',
  payload,
  meta
})

export const showRecipeSuccess = () => ({
  type: '@homeRecipe/LOGIN_REQUEST'
})

