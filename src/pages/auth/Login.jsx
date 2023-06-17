import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Проверка имени пользователя и пароля
    if (!username || !password) {
      console.error('Введите имя пользователя и пароль');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/registration', {
        username,
        password,
      });
      
      // Получаем данные пользователя из ответа сервера
      const { token, name } = response.data;
      console.log(response.data);

      // Сохраняем токен и имя пользователя в localStorage
      if (token && name) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', name);
      }

      // Дополнительные действия после успешного входа в систему
      // например, перенаправление на другую страницу
    } catch (error) {
      console.error('Ошибка входа:', error);
      // Обработка ошибки входа
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};

export default Login;
