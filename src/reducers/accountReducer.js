import { AccountState } from '../store/accountState';

export const accountReducer = (state = new AccountState(), action) => {
    switch (action.type) {
        case 'GET_MY_PROFILE':
            return {
                ...state,
                profile: action.result
            };
        case 'LOGIN_ACTION_SUCCESS':
            let userName = action.result.userName;
            localStorage.setItem('planny-user', userName);
            localStorage.setItem('planny-userToken', action.result.userToken);
            return {
                ...state,
                isLoggedIn: true,
                username: userName

            }
        case 'LOGIN_ACTION_INVALID':
            return {
                ...state,
                loginError: "Invalid username or password."
            }
        case 'LOGOUT_ACTION':
            localStorage.removeItem('planny-user');
            localStorage.removeItem('planny-userToken');
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
            return state;
        }
    }
};