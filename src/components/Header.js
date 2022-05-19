import React from 'react';
import {Navbar,NavItem,NavLink, NavbarBrand,Nav, NavbarToggler, Collapse} from 'reactstrap';

function Header(props){
    return(
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Bucketeer</NavbarBrand>
        <NavbarToggler/>
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
          <NavItem >
              <NavLink href="/" className="mx-2">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/cart" className="mx-2">Cart</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    )
}

export default Header;