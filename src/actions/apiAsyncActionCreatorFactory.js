import axios from "axios";
import { stopLoading, startLoading, apiError, showInfoModal } from './actionCreators/globalActionCreators';
import { push } from 'connected-react-router';

export const makeApiAction = ({
    url = "",
    method = "GET",
    data = null,
    onSuccess = undefined,
    onFailure = undefined,
    label = "",
    toggleIdLoading = true,
    onSuccessNavigation = undefined
}, dispatch) => {

    const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

    // axios default configs
    axios.defaults.baseURL = "https://localhost:44378/api";
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('planny-userToken')}`;
    axios.defaults.headers.common["Accept"] = "*/*";

    if (toggleIdLoading) {
        dispatch(startLoading());
    }

    axios
        .request({
            url,
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            [dataOrParams]: data,
        })
        .then(({ data }) => {
            if (onSuccessNavigation != undefined) {
                dispatch(push(onSuccessNavigation));
            }
            if (onSuccess != undefined) {
                //todo rename onSuccess action 
                dispatch(onSuccess(data));
            }
        })
        .catch(error => {
            dispatch(apiError(error));
            if (onFailure != undefined) {
                onFailure();
            }
        })
        .finally(() => {
            if (toggleIdLoading) {
                dispatch(stopLoading());
            }
        });
};


