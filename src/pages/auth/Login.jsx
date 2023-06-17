import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);

    // Simulating login API call
    setTimeout(() => {
      setIsLoading(false);
      // Здесь можно добавить логику для проверки существования аккаунта
      // В данном примере просто перенаправляем на страницу Home при успешном входе
      navigate('/home');
    }, 2000);
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className={styles.formControl}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className={styles.formControl}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
        <p className={styles.registerLink}>
          Еще нет аккаунта?{' '}
          <Link to="/registration">Зарегистрируйтесь!</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
