export function loginRequest(email, password) {
  return {
    type: 'LOGIN_REQUEST',
    value: { email, password }
  }
}

export function loginFailure() {
  return {
    type: 'LOGIN_FAILURE'
  }
}

export function loginSuccess(token) {
  return {
    type: 'LOGIN_REQUEST',
    value: { token }
  }
}

export function logout() {
  return {
    type: 'LOGOUT'
  }
}