import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet, NavLink } from "react-router-dom";


const Header = (props) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to='/' className='navbar-brand'>React-Bootstrap</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="us">User</Nav.Link>
              <Nav.Link href="adm">Admin</Nav.Link> */}
            <NavLink to='/' className='nav-link'>Home</NavLink>
            <NavLink to='/adm' className='nav-link'>Admin</NavLink>
            <NavLink to='/us' className='nav-link'>User</NavLink>
            <NavLink to='/learnReact' className='nav-link'>LearnReact</NavLink>
          </Nav>
          <Nav>
            <button className='btn-header btn-login'>Log in</button>
            <button className='btn-header btn-signup'>Sign up</button>
            {/* <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Log in</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" className='disabled'>Log out</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default Header;