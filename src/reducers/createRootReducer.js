import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { connectRouter } from 'connected-react-router';
import { accountReducer } from '../reducers/accountReducer';
import { myPlanniesReducer } from '../reducers/myPlanniesReducer';
import { publicPlanniesReducer } from '../reducers/publicPlanniesReducer';
import { appCommonReducer } from '../reducers/appCommonReducer';

export const createRootReducer = (history) => combineReducers({
    accountState: accountReducer,
    publicPlanniesState: publicPlanniesReducer,
    appCommonState: appCommonReducer, 
    myPlanniesState: myPlanniesReducer,
    router: connectRouter(history),
});