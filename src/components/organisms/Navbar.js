import React from 'react';
import { Navbar, Nav, NavItem, NavLink, Collapse, NavbarToggler } from 'reactstrap';

export class PlannyNavBar extends React.Component {

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
                            localStorage.getItem('user') &&
                            <NavItem>
                                <NavLink href="/logout">Logout</NavLink>
                            </NavItem>
                        }
                    </Nav>
                </Collapse>
            </Navbar>);
    }

}