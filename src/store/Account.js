export class AccountState {
    isLoggedIn;
    loginError;
    registerError;
    registerSuccess;
}

export const accountReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_ACTION_SUCCESS':           
            localStorage.setItem('user', 'asd');
            localStorage.setItem('userToken', action.result.accessToken);
            return {
                ...state,
                isLoggedIn: true
            }
        case 'LOGIN_ACTION_INVALID':           
            return {
                ...state,
                loginError: "Invalid username or password."
            }
        case 'LOGOUT_ACTION':
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

        default: {
            return { ...state };
        }

    }
};
