export function loginAction(result){    
   return { type: 'LOGIN_ACTION_RESULT', result}
}

export function logoutAction(){    
  return { type: 'LOGOUT_ACTION'};    
}

export function registerAction(result){
  return {  type: 'REGISTER_RESULT_ACTION',  result}
}