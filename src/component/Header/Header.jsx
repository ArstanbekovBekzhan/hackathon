import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown,NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Header = () => {
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
  }, [setPublicServices]);

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
              {/* <Link to="/About" className="nav-link" onClick={() => setExpanded(false)}>
                О нас
              </Link> */}
               <Link to="/register" className="nav-link" onClick={() => setExpanded(false)}>
                 Войти
              </Link>
<<<<<<< HEAD
              <Link to="/register" className="nav-link" onClick={() => setExpanded(false)}>
                Войти/Зарегистрироваться 
=======
              <Link to="/private" className="nav-link" onClick={() => setExpanded(false)}>
                Личный кабинет
>>>>>>> eccbcc4948113b62b8540d52d1b119b1063ed173
              </Link>
              <Link to="/private" className="nav-link" onClick={() => setExpanded(false)}>
                Личный кабинет
              </Link>
              <NavDropdown title="Общественные службы" id="public-services-dropdown">
                {publicServices.map((service) => (
                  
                  <NavDropdown.Item>
<<<<<<< HEAD
                     <Link className="list-group-item list-group-item-action" to={`/Categories/${service.id}`} key={service}>
=======
                     <Link className="list-group-item list-group-item-action" to={`/Categories/${service.eng}`} key={service}>
>>>>>>> eccbcc4948113b62b8540d52d1b119b1063ed173
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
