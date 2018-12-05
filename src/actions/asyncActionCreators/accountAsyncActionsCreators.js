import { HeaderHelper } from '../../actions/headerHelper';
import { loginSuccess, loginInvalid, registerResult, getMyProfile } from '../actionCreators/accountActionsCreators'
import { stopLoading, startLoading } from '../actionCreators/globalActionCreators';

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
        getMyProfileAsync: () => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();
            dispatch(startLoading());

            fetch("https://localhost:44378/api/profiles/own", {
                method: "GET",
                headers: requestHeaders,
            })
                .then(function (response) {
                    if (response.status === 200) {
                        response.json()
                            .then(function (data) {
                                dispatch(getMyProfile(data));
                                dispatch(stopLoading());
                            });
                    }
                })
                .catch(function (error) {
                    console.log("request failed.");
                });
        },
        editMyProfileAsync: (profile) => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader(); 
            console.log(profile);         

            fetch("https://localhost:44378/api/profiles/own/edit", {
                method: "PUT",
                body: String(profile),
                headers: requestHeaders,
            })
            .then(function (response) {
                if (response.status === 200) {
                    response.json()
                        .then(function (data) {                           
                           alert('success');
                    });
                }
            })
            .catch(function (error) {
                console.log("request failed.");
            });
        },
    }
};