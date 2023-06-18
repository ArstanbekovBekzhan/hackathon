import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Registration.module.css';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [img, setimg] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const generateToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
    }
    return token;
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Redirect to another page or show an error message
      navigate('/login');
    }
  }, [navigate]);

  const handleRegistration = async () => {
    if (!username || !password || !phone || !email) {
      console.log('Please fill in all required fields');
      return;
    }

    const token = generateToken();
    const IMG = img;
    const Username = username;

    localStorage.setItem('token', token);
    localStorage.setItem('IMG', IMG);
    localStorage.setItem("Username", Username);

    const registrationData = {
      username,
      password,
      img,
      phone,
      email,
      token
    };

    try {
      const response = await axios.post('http://localhost:3000/registration', registrationData);
      console.log('Registration successful:', response.data);
      navigate('/private'); // Перенаправление на страницу "Login" после успешной регистрации
    } catch (error) {
      console.log('Registration failed:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setimg(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Registration</h2>
      <form className={styles.form}>
        <label>
          Username:
          <input
            className={styles.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Photo:
          <input
            className={styles.input}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        <label>
          Phone:
          <input
            className={styles.input}
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button className={styles.button} type="button" onClick={handleRegistration}>
          Register
        </button>
        <p>
          Already have an account? <a href="http://localhost:3001/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Registration;
