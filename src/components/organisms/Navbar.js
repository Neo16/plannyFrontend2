import React from 'react';
import { Navbar, Nav, NavItem, NavLink, Collapse, NavbarToggler } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/actionCreators/accountActionsCreators';
import If from '../../components/atoms/If';
import { Link } from 'react-router-dom';


class PlannyNavBar extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    logOut() {
        this.props.logout();
    }

    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/">Planny</NavLink>
                        </NavItem>
                        <If condition={this.props.accountState.isLoggedIn}>
                            <NavItem>
                                <NavLink tag={Link} to="/plannies/my">My plannies</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/myparticipations">My participations</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/plannies/create">New Planny</NavLink>
                            </NavItem>
                        </If>
                    </Nav>
                    <Nav navbar className="nav ml-auto">
                        <If condition={this.props.accountState.isLoggedIn}>
                            <NavItem>
                                <NavLink tag={Link} to="/profile">Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="~" onClick={this.logOut.bind(this)}>Logout</NavLink>
                            </NavItem>
                        </If>
                        <If condition={!this.props.accountState.isLoggedIn}>
                            <NavItem>
                                <NavLink tag={Link} to="/login" >Login</NavLink>
                            </NavItem>
                        </If>
                    </Nav>
                </Collapse>
            </Navbar>);
    }
}

export default connect(
    (state) => ({
        accountState: state.accountState,
    }),
    {
        logout
    }
)(PlannyNavBar);
