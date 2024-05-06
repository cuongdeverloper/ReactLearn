import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { doLogout } from '../redux/action/userAction';
import './Header.scss'
import Language from './Language';
import { useTranslation } from 'react-i18next';
const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const account = useSelector(state => state.user.account);
  const {t} = useTranslation();
  const logOut = () => {
    dispatch(doLogout());
    navigate('/')
  }
  const goProfile = () =>{
    navigate('/profile')
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to='/' className='navbar-brand'>React-Bootstrap</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to='/' className='nav-link'>Home</NavLink>
            <NavLink to='/adm' className='nav-link'>Admin</NavLink>
            <NavLink to='/us' className='nav-link'>User</NavLink>
            <NavLink to='/learnReact' className='nav-link'>LearnReact</NavLink>
          </Nav>
          <Nav>
            {!isAuthenticated ?
              <>
                <button className='btn-header btn-login' onClick={() => (navigate("/login"))}>{t('Header.Login')}</button>
                <button className='btn-header btn-signup' onClick={() => (navigate("/SignUp"))}>{t('Header.Sign up')}</button>
              </> :
              <NavDropdown title={t('Header.Setting')} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => logOut()}>{t('Header.Log out')}</NavDropdown.Item>
                <NavDropdown.Item onClick={()=> goProfile()}>{t('Header.Profile')}</NavDropdown.Item>
              </NavDropdown>}
          </Nav>

              <Language/>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default Header;