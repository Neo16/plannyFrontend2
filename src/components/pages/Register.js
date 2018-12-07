import * as React from 'react';
import { Row, Col, Button, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { accountAsyncActionsCreators } from './../../actions/asyncActionCreators/accountAsyncActionsCreators';


class Register extends React.Component {

    constructor(props) {
        super(props);       
        this.state = {
            email: '',
            age: 0,
            password: '',
            userName: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }

    register() {
        this.props.register(JSON.stringify(this.state));
    }

    navigateToLogin() {
        this.props.history.push('/login');
    }
    render() {
        //const { from } = this.props.location.state || { from: { pathname: "/" } };
        //ha be van lépse a state szerint
        // if (localStorage.getItem('user')) {
        //     return <Redirect to={from} />;
        // }
        return (
            <Row>
                <Col md={4} mdOffset={4} className="basicForm">
                    <div className="title">Register</div>
                    <Input
                        value={this.state.email}
                        name="email"
                        onChange={this.handleChange}
                        type="text"
                        placeholder="email"
                    />
                    <Input
                        value={this.state.age}
                        name="age"
                        onChange={this.handleChange}
                        type="number"
                        placeholder="age"
                    />
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
                    {!this.props.state.registerSuccess &&
                        <Button onClick={this.register.bind(this)}>Register</Button>
                    }
                    {this.props.state.registerSuccess &&
                        <div>
                            <Button bsStyle="success" onClick={this.navigateToLogin.bind(this)}>Click here to log in</Button>
                            <p className='success'>Registration successful!</p>
                        </div>
                    }

                    {this.props.state.registerError &&
                        <p className='danger'>{this.props.state.registerError}</p>
                    }
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
)(Register);

