import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const correctUsername = 'Министерство транспорта';
    const correctPassword = 'MINISTRY_OF_TRANSPORTATION';
    if (username === correctUsername && password === correctPassword) {
      navigate('/admin');
    } else {
      window.location.reload();
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Container className='log_box'>
      <Row className="justify-content-center">
        <Col>
          <h2 className="text-center">Вход</h2>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label></Form.Label>
              <Form.Control className='block' type="text" placeholder="Введите имя пользователя" value={username} onChange={handleUsernameChange} />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label></Form.Label>
              <Form.Control className='block' type="password" placeholder="Введите пароль" value={password} onChange={handlePasswordChange} />
            </Form.Group>

            <Button className='log_btn' variant="primary" onClick={handleLogin}>Войти</Button>
            <p className='auth1-p' >Нет аккаунта? <Link className='registr' to="/register">Зарегистрируйся</Link></p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
