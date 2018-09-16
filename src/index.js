import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route} from 'react-router-dom';
import Register from './components/pages/Register';
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';
import { MainPage } from './components/MainPage';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {accountReducer} from './/store/Account'

const combinedReducer = combineReducers({
   accountState: accountReducer
});

const store = createStore(combinedReducer, applyMiddleware(thunk));

const render = () => {
  let activeStyle = {
      color: 'white',
      background: '#5e7bad'
  }
  ReactDOM.render(  
    <Provider store={store}>
      <BrowserRouter>
          <div className="fill">
            <Navbar dark collapseOnSelect> 
            <NavbarBrand>
                <NavbarToggler onClick={this.toggle} />        
            </NavbarBrand>    
              <Collapse>
                <Nav>
                  <NavItem>
                    <NavLink href="/" exact activeStyle={activeStyle} >Main Page</NavLink>
                  </NavItem>               
                  <NavItem>
                    <NavLink href="/myplannies" activeStyle={activeStyle} >My plannies</NavLink>
                  </NavItem>             
                  {
                      localStorage.getItem('user') &&           
                      <NavItem>
                          <NavLink href="/logout">Logout</NavLink>
                      </NavItem>               
                  }
                </Nav>

              </Collapse>
            </Navbar>
            <Container className="fill">
              <Route path='/register' component={Register}/>           
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