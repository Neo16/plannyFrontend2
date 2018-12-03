import { getSubCategoriesResult, getMainCategoriesResult} from '../actionCreators/categoryActionCreators';
import { HeaderHelper } from '../headerHelper';
import {stopLoading, startLoading} from '../actionCreators/globalActionCreators';

export const categoryAsyncActionCreators = (dispatch) => {
    return {
        getSubCategoriesAsync: () => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();
            dispatch(startLoading());

            fetch("https://localhost:44378/api/categories/sub", {
                method: "GET",
                headers: requestHeaders,
            })
            .then((response) => response.json())
            .then(function (data) {
                dispatch(getSubCategoriesResult(data));               
                dispatch(stopLoading());    
            });
        },
        getMainCategoriesAsync: () => {         
            dispatch(startLoading());
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();
            fetch("https://localhost:44378/api/categories/main", {
                method: "GET",
                headers: requestHeaders,
            })
            .then((response) => response.json())
            .then(function (data) {
                dispatch(getMainCategoriesResult(data));
                dispatch(stopLoading());    
            });
        },
    }
}
