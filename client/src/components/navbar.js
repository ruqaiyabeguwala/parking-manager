import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';
import {connect} from "react-redux";
import * as actions from "./../actions/index"
import { Redirect, withRouter } from 'react-router';

const MyNavbar = ({initSpace,getSpace, sortSpace, filterSpace,logout,history}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand onClick={()=>getSpace()} style={{cursor:"pointer"}}>Parking Mania</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink onClick={()=>initSpace()} style={{cursor:"pointer"}}>Initialize</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={()=>sortSpace()} style={{cursor:"pointer"}}>Sort </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Filter
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={()=>filterSpace(true)}>
                  Occupied spaces
                </DropdownItem>
                <DropdownItem onClick={()=>filterSpace(false)}>
                  Unoccupied spaces
                </DropdownItem>
                <DropdownItem divider />
               
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink style={{cursor:"pointer"}} onClick={()=>history.push("/report")}>Report </NavLink>
            </NavItem>
          </Nav>
          <Button onClick={()=>logout()}>Logout</Button>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default connect(null,actions)(withRouter(MyNavbar));