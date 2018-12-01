import React from 'react';
import { Navbar, Nav, NavItem, NavLink, Collapse, NavbarToggler } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/actionCreators/accountActionsCreators';
import If  from '../../components/atoms/If';


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
                            <NavLink href="/">Planny</NavLink>
                        </NavItem>     
                        <If condition={this.props.accountState.isLoggedIn }>
                            <NavItem>
                                <NavLink href="/myplannies">My plannies</NavLink>
                            </NavItem>
                             <NavItem>
                                  <NavLink href="/plannies/create" >New Planny</NavLink>
                            </NavItem>
                             <NavItem>
                                <NavLink href="~" onClick={this.logOut.bind(this)}>Logout</NavLink>
                            </NavItem>
                        </If>
                         <If condition={!this.props.accountState.isLoggedIn}>
                             <NavItem>
                                <NavLink href="/login" >Login</NavLink>
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
