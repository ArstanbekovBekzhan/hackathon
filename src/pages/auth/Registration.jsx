import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Registration.module.css';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [previewImage, setPreviewImage] = useState('');

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

  const handleRegistration = async () => {
    if (!username || !password || !phone || !email) {
      console.log('Please fill in all required fields');
      return;
    }

    const token = generateToken();

    localStorage.setItem('token', token);

    const registrationData = {
      username,
      password,
      photoUrl, // Updated to use photoUrl instead of photo
      phone,
      email,
      token
    };

    try {
      const response = await axios.post('http://localhost:3000/registration', registrationData);
      console.log('Registration successful:', response.data);
      navigate('/register');
    } catch (error) {
      console.log('Registration failed:', error);
    }
  };

  const handleFileChange = (event) => {
    const photoUrl = event.target.value;
    setPhotoUrl(photoUrl);
    setPreviewImage(photoUrl);
  };

  return (
    <div className={styles.container}>
      <h2>Registration</h2>
      <form className={styles.form}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {previewImage && (
          <img src={previewImage} alt="Preview" className={styles.previewImage} />
        )}

        <label>
          Photo URL:
          <input
            type="text"
            value={photoUrl}
            onChange={handleFileChange}
          />
        </label>

        <label>
          Phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleRegistration}>
          Register
        </button>
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Registration;
