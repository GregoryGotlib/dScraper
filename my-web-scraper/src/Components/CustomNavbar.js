import React from 'react'
import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import { NavbarContainer } from './style'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { userLogout } from '../Actions/UserAction';
import classnames from 'classnames';
import PropTypes from 'prop-types';

function CustomNavbar(props) {

    const isAuthenticated = props.auth.isAuthenticated;
    const user = props.auth.user;

    function handleLogout(e){
        e.preventDefault();
        props.userLogout();
    }

    const authenticatedUserLinks = (
    <NavbarContainer>
       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">dScraper</Navbar.Brand>
        <Navbar.Brand href="#home">
        <img
            src={user.avatar}
            width="30"
            height="30"
            className="d-inline-block align-top"
        />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
                <Nav >
                    <Nav.Link href="/data" id='data-brand'>
                        מה אנשים מחפשים
                    </Nav.Link>
                    <Nav.Link eventKey={2} href="/info" id='info-brand'>מידע נוסף</Nav.Link>
                    <Nav.Link eventKey={3} href="/" id='logout-brand' onClick={handleLogout}>
                        התנתק
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </NavbarContainer>
    )

    const guestNav = (
    <NavbarContainer>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">
            dScraper
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
                <Nav >
                    <Nav.Link href="/info" id='info-brand'>מידע נוסף</Nav.Link>
                </Nav>
            </Navbar.Collapse>   
        </Navbar>
    </NavbarContainer>
    )

    return (
        <>
            {isAuthenticated ? authenticatedUserLinks : guestNav}
        </>
    )
}

CustomNavbar.propTypes = {
    userLogout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  }
  
  const mapStateToProps =(state)=>({
    auth:state.auth
  })
  
  export default connect(mapStateToProps,{userLogout})(CustomNavbar);