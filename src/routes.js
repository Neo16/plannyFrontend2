import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './components/pages/Login';
import MyPlannies from './components/pages/MyPlannies';
import MainPage from './components/pages/MainPage';
import CreatePlanny from './components/pages/CreatePlanny';
import EditPlanny from './components/pages/EditPlanny';
import Details from './components/pages/Details';
import MyProfile from './components/pages/MyProfile';
import Register from './components/pages/Register';
import MyParticipations from './components/pages/MyParticipations';

export class Routes extends React.Component {
    render() {
        return (<Switch>
            <Route path='/register' component={Register} />
            <Route path='/' exact component={MainPage} />
            <Route path='/login' exact component={Login} />
            <Route path='/plannies/create' exact component={CreatePlanny} />
            <Route path='/plannies/edit/:id(\d+)' exact component={EditPlanny} />
            <Route path='/plannies/my' exact component={MyPlannies} />
            <Route path='/plannies/:id(\d+)' exact component={Details} />
            <Route path='/profile' exact component={MyProfile} />
            <Route path='/myparticipations' exact component={MyParticipations} />            
        </Switch>);
    }
}