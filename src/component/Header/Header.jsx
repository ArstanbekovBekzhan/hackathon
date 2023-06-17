import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" expanded={expanded} fixed="top">
        <Container>
          <Navbar.Brand href="/">Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggle} />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/" className="nav-link" onClick={() => setExpanded(false)}>
                Главная
              </Link>
              <Link to="/about" className="nav-link" onClick={() => setExpanded(false)}>
                О нас
              </Link>
              <Link to="/contact" className="nav-link" onClick={() => setExpanded(false)}>
                Войти/Зарегистрироваться 
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;