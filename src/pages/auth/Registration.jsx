import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Registration.module.css';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('');
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

  const handleRegistration = () => {
    if (!username || !password || !phone || !email) {
      console.log('Please fill in all required fields');
      return;
    }

    const token = generateToken();

    localStorage.setItem('token', token);

    console.log('Registration form submitted!');
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Photo:', photo);
    console.log('Phone:', phone);
    console.log('Email:', email);
    console.log('Token:', token);

    navigate('/home');
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
        <label>
          Photo:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
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