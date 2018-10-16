import { HeaderHelper } from '../../actions/headerHelper';
import {loginResult, registerResult} from '../actionCreators/accountActionsCreators'

export const accountAsyncActionsCreators = (dispatch) => {
    return {
        loginAsync: (loginData) => {
            let requestHeaders = HeaderHelper.getJsonHeader();

            fetch("https://localhost:44378/api/Account/login", {
                method: "POST",
                body: String(loginData),
                headers: requestHeaders,
            })
        //  .then(handleErrors)
            .then((response) => response.json())
            .then(function (data) {
                dispatch(loginResult(data));
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