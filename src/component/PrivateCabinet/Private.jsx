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
