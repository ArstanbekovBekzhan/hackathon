import React, { useState } from 'react';
import p from "./Private.module.css";

const Private = () => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [cards, setCards] = useState([
    {
      id: "1",
      made: true,
      Nick: "Нурик",
      Nick_image: "https://thumbs.dfs.ivi.ru/storage23/contents/d/f/3b0d9897433be7b674d72b78bc0087.jpg",
      title: "Столб",
      text: "Этот проклятый столб просто стоит на моем пути каждый день! Он совершенно ненужен и только мешает движению! Почему его не убирают? Я уже устал обходить его каждый раз, когда иду по этой дороге. Это просто неприемлемо!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9IMtEyGE3iYTnGyKa65gNFlgEsCIcFADsWkqZ4XO81KGh_CJNX16xATO8zo74gwQ3cWA&usqp=CAU",
      location: "Улица Манаса, дом 12",
      comments: [
        {
          id: "1",
          user_name: "Бекжан",
          comment: "Согласен с вами, столб на самом деле создает неудобство для движения. Возможно, стоит обратиться к местным властям с этой проблемой."
        },
        {
          id: "2",
          user_name: "Женя",
          comment: "Мне тоже не нравится этот столб! Кажется, он был установлен без должной проработки и без учета потребностей пешеходов. Власти должны разобраться в этом вопросе."
        }
      ]
    },
    {
      id: "2",
      made: false,
      Nick: "Марина",
      Nick_image: "https://klike.net/uploads/posts/2019-03/1551511801_1.jpg",
      title: "Дом",
      text: "Этот старый дом на углу просто ужасен! Он выглядит заброшенным и создает плохое впечатление о районе. Почему его не отремонтируют или не снесут? Это портит всю атмосферу!",
      image: "https://kubnews.ru/upload/resize_cache/iblock/dad/1200_630_2/dad1a66784cfc77b98e977a31b586521.jpg",
      location: "Проспект Чуй, дом 45",
      comments: [
        {
          id: "1",
          user_name: "Даурен",
          comment: "Действительно, этот дом выглядит весьма запущенным. Было бы замечательно, если бы власти обратили внимание на его состояние и приняли меры по его ремонту или сносу."
        },
        {
          id: "2",
          user_name: "Алихан",
          comment: "Согласен, это действительно неприятно смотреть на такие заброшенные здания. Надеюсь, власти обратят на это внимание."
        }
      ]
    },
  ]);

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

  return (
    <div className={p.container}>
      <div className={p.user_box}>
        <img src="https://thumbs.dfs.ivi.ru/storage23/contents/d/f/3b0d9897433be7b674d72b78bc0087.jpg" alt="#" />
        <h2 className={p.name}>Johnatan</h2>
        <div className={p.red_box}>
          <div className={p.red_circle}></div>
          <div className={p.red_circle}></div>
        </div>
        <div className={p.green_box}>
          <div className={p.green_circle}></div>
          <div className={p.green_circle}></div>
        </div>
      </div>
      <div className={p.card_desk}>
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
      </div>
    </div>
  );
};

export { Private };
import React, { useState, useEffect } from 'react';
import p from "./Private.module.css";
import axios from 'axios';

const Private = () => {
  const [done, setDone] = useState(null);
  const [cards, setCards] = useState([]);

  const handleToggle = (value) => {
    setDone(value);
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
        {cards.map(card => (
          <div key={card.id} className={p.card}>
            <img src={card.image} alt="#" />
            <h3>{card.title}</h3>
            <div></div>
          </div>
        ))}
      </div>
      <button className={p.add_btn}>Добавить событие</button>
    </div>
  );
}

export { Private };
