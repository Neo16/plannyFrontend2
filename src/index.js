import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import PlannyNavBar from './components/organisms/Navbar';
import { library as fontLibrary } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import If from './components/atoms/If';
import { Spinner } from './components/atoms/Spinner';
import { store, history } from './store/configureStore';
import { Routes } from './routes';
 
fontLibrary.add(faAngleLeft);
fontLibrary.add(faAngleRight);
fontLibrary.add(faAngleDown);
fontLibrary.add(faAngleUp);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <React.Fragment>
          <PlannyNavBar />
          <Container className='fill' hidden={store.getState().appCommonState.isLoading}>
            <Routes/>         
          </Container>
          <If condition={store.getState().appCommonState.isLoading}>
            <Spinner />
          </If>
        </React.Fragment>
      </ConnectedRouter>
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