export function loginSuccess(result){    
   return { type: 'LOGIN_ACTION_SUCCESS', result}
}

export function loginInvalid(result){    
  return { type: 'LOGIN_ACTION_INVALID'}
}

export function logout(){    
  return { type: 'LOGOUT_ACTION'};    
}

export function registerResult(result){
  return {  type: 'REGISTER_RESULT_ACTION',  result}
}

export function getMyProfile(result){
  return {  type: 'GET_MY_PROFILE',  result}
}
