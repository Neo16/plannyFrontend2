import * as React from 'react';
import { Row, Col, Button, Input } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { accountAsyncActionsCreators } from '../../actions/asyncActionCreators/accountAsyncActionsCreators'
import { connect } from 'react-redux';
import './Login.css';

export class Login extends React.Component {

  constructor(props) {   
    super(props);
    this.state = {
      userName: "",
      password: "",
      redirectToReferrer: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }

  login() {
    var loginData = {
      userName: this.state.userName,
      password: this.state.password
    }
    this.props.loginAsync(JSON.stringify(loginData));
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };  
    
    if (this.props.state.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (   
      <Row>
        <Col xl={{ size: 4, offset: 4}} lg={{ size: 6, offset: 3 }}  md={{ size: 8, offset: 2 }} className="loginForm">
          <h3>Login</h3>
          <Input
            value={this.state.userName}
            name="userName"
            onChange={this.handleChange}
            type="text"
            placeholder="username"
          />
          <Input
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
            type="password"
            placeholder="password"
          />
          {
            (this.props.state.loginError) &&
            <p>{this.props.state.loginError} </p>
          }
          <Button className="submitBtn" onClick={this.login.bind(this)}>Login</Button>
          <Link to="/register">Register</Link>
        </Col>
      </Row>
    );
  }
}

export default connect(
  (state) => ({
    state: state.accountState
  }),
  accountAsyncActionsCreators
)(Login); 