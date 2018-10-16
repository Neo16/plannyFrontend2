export function loginResult(result){    
   return { type: 'LOGIN_ACTION_RESULT', result}
}

export function logout(){    
  return { type: 'LOGOUT_ACTION'};    
}

export function registerResult(result){
  return {  type: 'REGISTER_RESULT_ACTION',  result}
}