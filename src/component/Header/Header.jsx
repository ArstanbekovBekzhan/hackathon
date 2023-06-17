import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = ({ onHeaderHeight }) => {
  const [expanded, setExpanded] = useState(false);
  const [publicServices, setPublicServices] = useState([]);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/publicServices');
        setPublicServices(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const headerElement = document.querySelector('.navbar');
      if (headerElement) {
        const height = headerElement.offsetHeight;
        onHeaderHeight(height);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call to set the header height

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onHeaderHeight]);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" expanded={expanded} fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggle} />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/" className="nav-link" onClick={() => setExpanded(false)}>
                Главная
              </Link>
               <Link to="/register" className="nav-link" onClick={() => setExpanded(false)}>
                 Войти
              </Link>
              <Link to="/private" className="nav-link" onClick={() => setExpanded(false)}>
                Личный кабинет
              </Link>
              <NavDropdown title="Общественные службы" id="public-services-dropdown">
                {publicServices.map((service) => (
                  <NavDropdown.Item key={service.eng}>
                    <Link className="list-group-item list-group-item-action" to={`/Categories/${service.eng}`}>
                      {service.Name}
                    </Link>
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
