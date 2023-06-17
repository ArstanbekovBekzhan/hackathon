import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = ({ onHeaderHeight }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [expanded, setExpanded] = useState(false); // Add this line to define 'expanded' and 'setExpanded'

  const handleResize = () => {
    const height = document.getElementById('header').offsetHeight;
    setHeaderHeight(height);
    if (onHeaderHeight) {
      onHeaderHeight(height);
    }
  };

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    handleResize(); // Set initial header height
    window.addEventListener('resize', handleResize); // Update header height on window resize

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up the event listener
    };
  }, []);

  return (
    <>
      <div id="header">
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
      </div>
    </>
  );
};

export default Header;