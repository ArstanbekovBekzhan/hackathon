import React, { useState, useEffect } from 'react';
import p from "./Private.module.css";
import axios from 'axios';

const Private = () => {
  const [done, setDone] = useState(null);
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [subtitleVisible, setSubtitleVisible] = useState(true);

  const handleToggle = (value) => {
    setDone(value);
    setSubtitleVisible(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    // Reset input values when closing the modal
    setImage('');
    setTitle('');
    setDescription('');
    setAddress('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create a new card object with the input values
    const newCard = {
      id: (cards.length + 1).toString(),
      made: false,
      Nick: 'Your Name', // Replace with the actual name from the user input or a default value
      Nick_image: 'https://example.com/your-image.jpg', // Replace with the actual image URL from the user input or a default value
      title: title,
      text: description,
      image: image,
      location: address,
      comments: [] // No comments initially for the new card
    };

    // Add the new card to the existing cards array
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);

    // Reset input values and close the modal
    setImage('');
    setTitle('');
    setDescription('');
    setAddress('');
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cards');
        const filteredCards = response.data.filter(card => card.made === done);
        setCards(filteredCards);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [done]);

  return (
    <div className={p.container}> 
      <div className={p.user_box}>
        <img src="https://thumbs.dfs.ivi.ru/storage23/contents/d/f/3b0d9897433be7b674d72b78bc0087.jpg" alt="#" />
        <h2 className={p.name}>Johnatan</h2>
        <button className={p.green_box} onClick={() => handleToggle(true)}>Выполнено</button>
        <button className={p.red_box} onClick={() => handleToggle(false)}>Не выполнено</button>
      </div>
      <div className={p.card_desk}>
        {subtitleVisible && <h3 className={p.subtitle}>"Гражданская ответственность — действие, открытое сердцем и умом!"</h3>}
        {cards.map(card => (
          <div key={card.id} className={p.card}>
            <img src={card.image} alt="#" />
            <h3>{card.title}</h3>
            <div></div>
          </div>
        ))}
      </div>
      <button className={p.add_btn} onClick={handleModalOpen}>Добавить событие</button>
      {showModal && (
        <div className={p.modal}>
          <div className={p.modal_content}>
            <span className={p.close} onClick={handleModalClose}>&times;</span>
            <form onSubmit={handleFormSubmit}>
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
              <button type="submit">Сохранить</button>
            </form>
          </div>
        </div>
      )}
      <button className={p.add_btn}>Добавить событие</button> 
    </div>
  );
}

export { Private };
