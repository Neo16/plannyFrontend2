import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import Register from './components/pages/Register';
import { Container } from 'reactstrap';
import MainPage from './components/pages/MainPage';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { accountReducer } from './/store/Account'
import { acquirePlanniesReducer } from './/store/AcquirePlannies'
import { appStatusReducer } from './/store/AppStatus'
import { PlannyNavBar } from './components/organisms/Navbar'
import { library as fontLibrary } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'


const combinedReducer = combineReducers({
  accountState: accountReducer,
  acquirePlanniesState: acquirePlanniesReducer,
  appStatusState: appStatusReducer
});

const store = createStore(combinedReducer, applyMiddleware(thunk));

fontLibrary.add(faAngleLeft);
fontLibrary.add(faAngleRight);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <PlannyNavBar />
          <Container className="fill">
            <Route path='/register' component={Register} />
            <Route path='/' exact component={MainPage} />
          </Container>
        </div>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
}

store.subscribe(render);
registerServiceWorker();
render();