import { push } from 'connected-react-router';

export const commonAsyncActionCreators = (dispatch) => {
    return {
        navigate: (url) => {
            dispatch(push(url));   
        }
    }
};