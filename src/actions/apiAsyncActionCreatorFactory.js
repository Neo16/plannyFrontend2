import axios from "axios";
import { stopLoading, startLoading, apiError } from './actionCreators/globalActionCreators';

export const makeApiAction = ({
    url = "",
    method = "GET",
    data = null,
    onSuccess = () => { },
    onFailure = apiError,
    label = ""
}, dispatch) => {

    const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

    // axios default configs
    axios.defaults.baseURL = "https://localhost:44378/api";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('planny-userToken')}`;
    axios.defaults.headers.common["Accept"] = "*/*";

    dispatch(startLoading());

    axios
        .request({
            url,            
            method,            
            [dataOrParams]: data,
        })
        .then(({ data }) => {
            dispatch(onSuccess(data));
        })
        .catch(error => {
            dispatch(onFailure(error));
        })
        .finally(() => {
            dispatch(stopLoading());
        });
};


