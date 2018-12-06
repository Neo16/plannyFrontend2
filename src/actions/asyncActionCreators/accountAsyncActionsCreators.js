import { loginSuccess, loginInvalid, registerResult, getMyProfile } from '../actionCreators/accountActionsCreators';
import { makeApiAction } from '../apiAsyncActionCreatorFactory';

export const accountAsyncActionsCreators = (dispatch) => {
    return {
        loginAsync: (loginData) => {
            makeApiAction({
                url: 'account/login',
                method: 'POST',
                onSuccess: loginSuccess,
                onFailure: loginInvalid,
                data: String(loginData)
            }, dispatch);
        },
        registerAsync: (data) => {
            makeApiAction({
                url: 'account/register',
                method: 'POST',
                onSuccess: registerResult,
                data: data
            }, dispatch);
        },
        getMyProfileAsync: () => {
            makeApiAction({
                url: 'profiles/own',
                onSuccess: getMyProfile,
            }, dispatch);
        },
        editMyProfileAsync: (profile) => {
            makeApiAction({
                url: 'profiles/own/edit',
                method: 'POST',
                onSuccess: () => { alert('Successfully saved profile.') },
                data: String(profile)
            }, dispatch);
        },
    }
};