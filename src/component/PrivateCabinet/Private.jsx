import React, { useState, useEffect, useRef } from 'react';
import p from './Private.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Private = () => {
  const [done, setDone] = useState(null);
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [tag, setTag] = useState('');
  const [subtitleVisible, setSubtitleVisible] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Redirect to another page if the token is missing
      navigate('/login');
    }
  }, [navigate]);
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
    setImage('');
    setTitle('');
    setDescription('');
    setAddress('');
    setTag('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newCard = {
      id: (cards.length + 1).toString(),
      made: false,
      Nick: 'Your Name',
      Nick_image: 'https://example.com/your-image.jpg',
      title: title,
      text: description,
      image: image,
      location: address,
      comments: [],
    };

    const updatedCards = [...cards, newCard];
    setCards(updatedCards);

    setImage('');
    setTitle('');
    setDescription('');
    setAddress('');
    setTag('');
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cards');
        const filteredCards = response.data.filter((card) => card.made === done);
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
        event.target.classList.contains(p.modal)
      ) {
        handleModalClose();
      }
    };

    document.addEventListener('click', handleClickOutsideModalContent);

    return () => {
      document.removeEventListener('click', handleClickOutsideModalContent);
    };
  }, []);
  const Username = localStorage.getItem('Username');
  const IMG = localStorage.getItem('IMG');

  return (
    <div className={p.container}>
      <div className={p.user_box}>
        <img src={IMG} alt="#" />
        <h2 className={p.name}>{Username}</h2>
        <button className={p.green_box} onClick={() => handleToggle(true)}>
          Выполнено
        </button>
        <button className={p.red_box} onClick={() => handleToggle(false)}>
          Не выполнено
        </button>
      </div>
      <div className={p.card_desk}>
        {subtitleVisible && (
          <h3 className={p.subtitle}>"Гражданская ответственность — действие, открытое сердцем и умом!"</h3>
        )}
        {cards.map((card) => (
          <div key={card.id} className={p.card}>
            <img src={card.image} alt="#" />
            <h3>{card.title}</h3>
            <div></div>
          </div>
        ))}
      </div>
      <button className={p.add_btn} onClick={handleModalOpen}>
        Добавить событие
      </button>
      {showModal && (
        <div className={p.modal}>
          <div className={p.modal_content} ref={modalRef}>
            <form onSubmit={handleFormSubmit}>
              <span className={p.close} onClick={handleModalClose}>
                &times;
              </span>
              <input
                type="file"
                placeholder="Картинка"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <input
                type="text"
                placeholder="Добавьте название"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Добавьте описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <input
                type="text"
                placeholder="Напишите адрес"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="radio"
                placeholder="Напишите адрес"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <button type="submit">Сохранить</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Private ;