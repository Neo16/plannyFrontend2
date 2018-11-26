import React from 'react';
import { Navbar, Nav, NavItem, NavLink, Collapse, NavbarToggler } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/actionCreators/accountActionsCreators';


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
                            <NavLink href="/">Main Page</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/myplannies">My plannies</NavLink>
                        </NavItem>
                        {
                            this.props.accountState.isLoggedIn &&
                            <NavItem>
                                <NavLink onClick={this.logOut}>Logout</NavLink>
                            </NavItem>
                        }
                        {
                            !this.props.accountState.isLoggedIn &&
                            <NavItem>
                                <NavLink href="/login" >Login</NavLink>
                            </NavItem>
                        }
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
