import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Profile.module.css'; // Import the CSS file for styling

const RegistrationData = () => {
  const [registrationData, setRegistrationData] = useState([]);

  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/registration');
        setRegistrationData(response.data);
      } catch (error) {
        console.log('Error fetching registration data:', error);
      }
    };

    fetchRegistrationData();
  }, []);

  return (
    <div className="registration-data">
      <h2>Registration Data</h2>
      {registrationData.length === 0 ? (
        <p>No registration data available.</p>
      ) : (
        <ul className="registration-list">
          {registrationData.map((data) => (
            <li key={data.id} className="registration-item">
              <h3>Username: {data.username}</h3>
              <img src={data.photoUrl} alt="User Photo" className="user-photo" />
              <p>Phone: <a href={`tel:${data.phone}`}>{data.phone}</a></p>
              <p>Email: <a href={`mailto:${data.email}`}>{data.email}</a></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RegistrationData;
