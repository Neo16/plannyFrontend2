
import { loginAction, logoutAction, registerAction}  from '../actions/accountActions';
import { HeaderHelper } from './headerHelper';

export const acountActionCreators = (dispatch) => {
    return {
        login: (loginData) => {
            let requestHeaders = HeaderHelper.getJsonHeader();

            fetch("https://localhost:44378/api/Account/login", {
                method: "POST",
                body: String(loginData),
                headers: requestHeaders,
            })
                .then(handleErrors)
                .then((response) => response.json())
                .then(function (data) {                    
                    dispatch(loginAction(data));                    
                })
                .catch(function (error) {
                    console.log("request failed.");
                });
        },
        logout: () => {
            dispatch(logoutAction());
        },
        register: (data) => {
            let requestHeaders = HeaderHelper.getJsonHeader();

            fetch("https://localhost:44378/api/Account/Register", {
                method: "POST",
                body: String(data),
                headers: requestHeaders,
            })
                .then(function (response) {                
                    response.json().then(function (data) {                       
                        console.log(data);
                        dispatch(registerAction(data));                        
                    })
                     
                })
                .catch(function (error) {
                    console.log("Registration failed.");
                });

        },
    }
};

function handleErrors(response: any) {
    if (!response.ok) {
        throw Error(response);
    }
    return response;
}