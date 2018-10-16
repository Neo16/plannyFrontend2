import { getCategoriesResult, getMainCategoriesResult} from '../actionCreators/categoryActionCreators';
import { HeaderHelper } from '../headerHelper';
import {stopLoading, startLoading} from '../actionCreators/globalActionCreators';

export const categoryAsyncActionCreator = (dispatch) => {
    return {
        getCategoriesAsync: () => {
            let requestHeaders = HeaderHelper.getAuthorizedJsonHeader();
        
            fetch("https://localhost:44378/api/categories", {
                method: "GET",
                headers: requestHeaders,
            })
            .then((response) => response.json())
            .then(function (data) {            
                dispatch(getCategoriesResult(data));            
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
