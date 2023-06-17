import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SDCard from "./Details.module.css";
import CardMap from '../../component/Cards/CardMap';
import Comment from "../../component/Comments/comments";

const CardDetails = () => {
  const [backgroundColor, setBackgroundColor] = useState("");
  const { id } = useParams();
  const [address, setAddress] = useState("");
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/cards/${id}`);
        const data = response.data;
        setCard(data);
        setLoading(false);
        setAddress(data.location);
      } catch (error) {
        console.error('Error fetching card details:', error);
        setLoading(false);
      }
    };

    fetchCardDetails();
  }, [id]);

  const getRandomGradient = () => {
    const color1 = getRandomDarkColor();
    const color2 = getRandomDarkColor();
    const gradient = `linear-gradient(to bottom left, ${color1}, ${color2})`;
    setBackgroundColor(gradient);
  };

  const getRandomDarkColor = () => {
    const hue = Math.floor(Math.random() * 360); 
    const saturation = Math.floor(Math.random() * 51) + 50; 
    const lightness = Math.floor(Math.random() * 16) + 10; 
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getRandomGradient();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ background: backgroundColor }} className={SDCard.ContentDetails}>
          <div className={SDCard.Black}>
            <button onClick={goBack}></button>
          </div>
          <div className={SDCard.Details}>
            <div className={SDCard.left}>
              <img src={card.image} alt="" />
            </div>
            <div className={SDCard.right}>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
              <h4>{address}</h4>
            </div>
          </div>
          <CardMap address={address} />
        </div>
      )}
      <div>
      <h1 className={SDCard.title_comment}>Коментарий</h1>
        <Comment cardId={id} />
      </div>
    </div>
  );
};

export { CardDetails };
