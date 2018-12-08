import axios from "axios";
import { stopLoading, startLoading, apiError } from './actionCreators/globalActionCreators';

export const makeApiAction = ({
    url = "",
    method = "GET",
    data = null,
    onSuccess = () => { },
    onFailure = apiError,
    label = "",
    toggleIdLoading = true
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
            headers:{
                'Content-Type': 'application/json'
            },  
            [dataOrParams]: data,
        })
        .then(({ data }) => {
            dispatch(onSuccess(data));
        })
        .catch(error => {
            dispatch(onFailure(error));
        })
        .finally(() => {
            if (toggleIdLoading) {
                dispatch(stopLoading());
            }            
        });
};


