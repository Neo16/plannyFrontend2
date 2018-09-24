export class AccountState {
    isLoggedIn;
    registerError;
    registerSuccess;
}

export const accountReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_ACTION_RESULT':
            console.log(action.result.accessToken);
            localStorage.setItem('user', 'asd');
            localStorage.setItem('userToken', action.result.accessToken);
            return {
                ...state,
                isLoggedIn: true
            }
        case 'LOGOUT_ACTION':
            console.log('logout');
            return {
                ...state,
                isLoggedIn: false
            }
        case 'REGISTER_RESULT_ACTION':           
            if (action.success) {
                return {
                    ...state,
                    registerError: '',
                    registerSuccess: true,
                }
            }
            else {
                return {
                    ...state,
                    registerError: action.error,
                    registerSuccess: false
                }
            }

        default:
            return state || { isLoggedIn: false, registerError: '', registerSuccess: false };

    }
};
