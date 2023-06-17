import React from 'react';
import "./Header.css";
import { Navbar, Container, Nav } from 'react-bootstrap'

import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <Navbar collapseOnSelect expand="md" variant="dark">
                <Container id='bar'>
                    <Navbar.Brand href="/">
                 
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className='nav-list'>
                            <Link to="/" >Главная</Link>
                            <Link to="/about">О Нас </Link>
                            {/* <Link to="/contacts"></Link> */}
                            <Link to="/signUp">Войти</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
  </div>
  );
};

export default Header;
