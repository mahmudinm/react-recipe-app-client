export const loginRequest = (payload, meta) => ({
  type: 'LOGIN_REQUEST',
  payload,
  meta
})

export function loginFailure() {
  return {
    type: 'LOGIN_FAILURE'
  }
}

export function loginSuccess(token) {
  return {
    type: 'LOGIN_SUCCESS',
    payload: token 
  }
}

export function logout() {
  return {
    type: 'LOGOUT'
  }
}

export const refreshToken = (payload) => ({
  type: 'REFRESH_TOKEN_SUCCESS',
  payload
})