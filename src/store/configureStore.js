import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createRootReducer } from '../reducers/createRootReducer';
import thunk from 'redux-thunk';

export const history = createBrowserHistory();

//redux developer tool settings:
const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(    
    routerMiddleware(history),
    thunk
  )
);

export const store = createStore(
  createRootReducer(history),
  enhancer
);