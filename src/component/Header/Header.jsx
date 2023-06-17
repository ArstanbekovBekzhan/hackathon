import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ onHeaderHeight }) => {
  const [expanded, setExpanded] = useState(false);
  const [publicServices, setPublicServices] = useState([]);
  const location = useLocation();

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleHeaderHeight = () => {
    const headerElement = document.querySelector('.navbar');
    if (headerElement) {
      const height = headerElement.offsetHeight;
      onHeaderHeight(height);
    }
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
    handleHeaderHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleResize = () => {
      handleHeaderHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname]); // Trigger on pathname change

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" expanded={expanded} fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Logo
          </Navbar.Brand>
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
              <Link to="/admin" className="nav-link" onClick={() => setExpanded(false)}>
                Админ кабинет
              </Link>
              <NavDropdown title="Общественные службы" id="public-services-dropdown">
                {publicServices.map((service) => (
                  <NavDropdown.Item key={service.eng}>
                    <Link className="list-group-item list-group-item-action" to={`/Categories/${service.eng}/${service.id}`}>
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