import { getSubCategoriesResult, getMainCategoriesResult } from '../actionCreators/categoryActionCreators';
import { makeApiAction } from '../apiAsyncActionCreatorFactory';

export const categoryAsyncActionCreators = (dispatch) => {
    return {
        getSubCategoriesAsync: () => {
            makeApiAction({
                url: 'categories/sub',
                onSuccess: getSubCategoriesResult
            }, dispatch);
        },       
        getMainCategoriesAsync: () => {
            makeApiAction({
                url: 'categories/main',
                onSuccess: getMainCategoriesResult
            }, dispatch);
        }
    }
}
