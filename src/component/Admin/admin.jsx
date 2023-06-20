import React, { useState, useEffect, useRef } from 'react';
import a from './admin.module.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Admin = () => {
  const [done, setDone] = useState(null);
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cardData, setCardData] = useState({
    image: '',
    title: '',
    description: '',
    address: '',
    tag: ''
  });
  const [subtitleVisible, setSubtitleVisible] = useState(true);

  const modalRef = useRef(null);

  const handleToggle = (value) => {
    setDone(value);
    setSubtitleVisible(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCardData({
      image: '',
      title: '',
      description: '',
      address: '',
      tag: ''
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newCard = {
      id: (cards.length + 1).toString(),
      made: false,
      Nick: 'Your Name',
      Nick_image: 'https://example.com/your-image.jpg',
      ...cardData,
      comments: []
    };

    setCards([...cards, newCard]);
    setShowModal(false);
    setCardData({
      image: '',
      title: '',
      description: '',
      address: '',
      tag: ''
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cards');
        const filteredCards = response.data.filter((card) => card.made === done && card.tag === 'MINISTRY_OF_TRANSPORTATION');
        setCards(filteredCards);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [done]);

  useEffect(() => {
    const handleClickOutsideModalContent = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        event.target.classList.contains(a.modal)
      ) {
        handleModalClose();
      }
    };

    document.addEventListener('click', handleClickOutsideModalContent);

    return () => {
      document.removeEventListener('click', handleClickOutsideModalContent);
    };
  }, []);

  return (
    <div className={a.container}>
      <div className={a.user_box}>
        <img src="https://st-1.akipress.org/st_gallery/70/1323470.f2bda59559d6b7bf06323276520bd8b3.jpg" alt="#" />
        <h2 className={a.name}>Министерство транспорта</h2>
        <button className={a.green_box} onClick={() => handleToggle(true)}>
          Выполнено
        </button>
        <button className={a.red_box} onClick={() => handleToggle(false)}>
          Не выполнено
        </button>
      </div>
      <div className={a.card_desk}>
        {cards.map((card) => (
          <NavLink
            style={{ backgroundColor: card.made ? 'green' : 'red' }}
            key={card.id}
            to={`/cards/${card.id}`}
          >
            <div className={a.card}>
              <img src={card.image} alt="#" />
            </div>
            <div>
              <h3 className={a.subtitle}>{card.title}</h3>
              <div></div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export { Admin };
