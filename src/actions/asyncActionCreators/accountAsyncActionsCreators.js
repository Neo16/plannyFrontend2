import { HeaderHelper } from '../../actions/headerHelper';
import { loginSuccess, loginInvalid, registerResult } from '../actionCreators/accountActionsCreators'

export const accountAsyncActionsCreators = (dispatch) => {
    return {
        loginAsync: (loginData) => {
            let requestHeaders = HeaderHelper.getJsonHeader();

            fetch("https://localhost:44378/api/Account/login", {
                method: "POST",
                body: String(loginData),
                headers: requestHeaders,
            })
            .then(function (response) {
                if (response.status === 200) {
                    response.json()
                        .then(function (data) {
                            console.log(data);
                            dispatch(loginSuccess(data));
                        });
                }
                else if (response.status === 400) {                  
                    dispatch(loginInvalid());                  
                }
            })
            .catch(function (error) {
                console.log("request failed.");
            });
        },
        registerAsync: (data) => {
            let requestHeaders = HeaderHelper.getJsonHeader();

            fetch("https://localhost:44378/api/Account/Register", {
                method: "POST",
                body: String(data),
                headers: requestHeaders,
            })
                .then((response) => response.json())
                .then(function (data) {
                    console.log(data);
                    dispatch(registerResult(data));
                })
                .catch(function (error) {
                    console.log("Registration failed.");
                });
        },
    }
};