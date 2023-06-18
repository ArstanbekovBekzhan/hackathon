import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PSDS from "./PSD.module.css";

const PublicServicesDynamic = () => {
  const { serviceEng, id } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/publicServices/${id}`);
        setServiceData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchServiceData();
  }, [id]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cards');
        const filteredCards = response.data.filter((card) => card.tag);
        setCardData(filteredCards);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCardData();
  }, [serviceEng]);

  return (
    <div className={PSDS.detaliP}>
      {serviceData && (
        <div className={PSDS.Img}>
          <img src={serviceData.image} alt="" />
          <h2>{serviceData.Name}</h2>
        </div>
      )}

      <div className={PSDS.cardContainer}>
        {cardData.map((card) => (
            serviceEng === card.tag ?
            <div key={card.id} className={PSDS.card}>
                <img src={card.image} alt="" />
                <h3 className={PSDS.text}>{card.title}</h3>
            <p>{card.description}</p>
            </div> : null
        ))}
      </div>
    </div>
  );
};

export { PublicServicesDynamic };