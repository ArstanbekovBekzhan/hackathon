import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const correctUsername = 'username';
    const correctPassword = 'password';
    if (username === correctUsername && password === correctPassword) {
      navigate('/dev');
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
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={10} sm={8} md={6} lg={4}>
          <h2 className="text-center">Авторизация</h2>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control type="text" placeholder="Введите имя пользователя" value={username} onChange={handleUsernameChange} />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" placeholder="Введите пароль" value={password} onChange={handlePasswordChange} />
            </Form.Group>

            <Button variant="primary" block onClick={handleLogin}>Войти</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
