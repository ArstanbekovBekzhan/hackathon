import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = ({ onHeaderHeight }) => {
  const [expanded, setExpanded] = useState(false);
  const [publicServices, setPublicServices] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

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

  }, []);

  const hasToken = localStorage.getItem('token');
  const Username = localStorage.getItem('Username');
  const IMG = localStorage.getItem('IMG');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const handleResize = () => {
      handleHeaderHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname]);

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
              {!hasToken && (
                <Link to="/login" className="nav-link" onClick={() => setExpanded(false)}>
                  Войти
                </Link>
              )}
              {hasToken && (
                <Link to="/private" className="nav-link" onClick={() => setExpanded(false)}>
                  Личный кабинет
                </Link>
              )}

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
          {hasToken && (
            <div className="users">
              <img style={{ width: '54px', height: '54px', objectFit: 'cover', borderRadius: '50%' }} src={IMG} alt="User" />
              <h2 style={{ color: 'white' }}>{Username}</h2>
              <button onClick={handleLogout} style={{ border: 'none', borderRadius: '5px' }}>Выход</button>
            </div>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
