import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import Register from './components/pages/Register';
import { Container } from 'reactstrap';
import MainPage from './components/pages/MainPage';
import CreatePlanny from './components/pages/CreatePlanny';
import EditPlanny from './components/pages/EditPlanny';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { accountReducer } from './/store/Account'
import { pictureUploadReducer } from './/store/PictureUpload'
import { myPlanniesReducer } from './/store/MyPlannies'
import { acquirePlanniesReducer } from './/store/AcquirePlannies'
import { appCommonReducer } from './/store/AppCommon'
import PlannyNavBar from './components/organisms/Navbar'
import { library as fontLibrary } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Login from './components/pages/Login';
import MyPlannies from './components/pages/MyPlannies';
import Details from './components/pages/Details';
import If from './components/atoms/If';
import { Spinner } from './components/atoms/Spinner';

//redux developer tool settings:
const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

const combinedReducer = combineReducers({
  accountState: accountReducer,
  acquirePlanniesState: acquirePlanniesReducer,
  appCommonState: appCommonReducer,
  pictureUploadState: pictureUploadReducer,
  myPlanniesState: myPlanniesReducer
});

const store = createStore(
  combinedReducer,
  enhancer
);

fontLibrary.add(faAngleLeft);
fontLibrary.add(faAngleRight);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <React.Fragment>
          <PlannyNavBar />
          <Container className='fill' hidden={store.getState().appCommonState.isLoading}>
            <Route path='/register' component={Register} />
            <Route path='/' exact component={MainPage} />
            <Route path='/login' exact component={Login} />
            <Route path='/plannies/create' exact component={CreatePlanny} />
            <Route path='/plannies/edit/:id(\d+)' exact component={EditPlanny} />
            <Route path='/plannies/my' exact component={MyPlannies} />
            <Route path='/plannies/:id(\d+)' exact component={Details} />
          </Container>

          <If condition={store.getState().appCommonState.isLoading}>
            <Spinner />
          </If>
        </React.Fragment>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
}

if (localStorage.getItem('planny-user')) {
  store.getState().accountState.isLoggedIn = true;
}


store.subscribe(render);
registerServiceWorker();
//todo store-ba betenni, hogy be van-e jelentkezve
render();