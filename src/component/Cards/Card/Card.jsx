import SCard from "./Card.module.css";
import Erros from "../../../Galilee/errors.png";
import { NavLink } from "react-router-dom";

const Card = ({ cards }) => (
      <div className={SCard.Cards}>
         {cards.map(card => (
          <NavLink  
          style={{ backgroundColor: card.made ? 'green' : 'red' }}
           className={SCard.Card} key={card.id} to={`/cards/${card.id}`}>
          <div>
          <img src={card.image || Erros } alt="#" />
          </div>
          <div className={SCard.text}>
          <h3>{card.title }</h3>
          <div className={SCard.Nik}>
            <img src={card.Nick_image} alt="#" />
          <h4>{card.Nick}</h4>
          </div>
          <div className={SCard.made}>
            <img src={card.made ? 'https://cdn-icons-png.flaticon.com/512/1280/1280891.png' : 'https://w7.pngwing.com/pngs/206/841/png-transparent-multiplication-sign-symbol-x-mark-symbol-miscellaneous-angle-playstation-4.png'} alt="#" />
          </div>
        </div>
      </NavLink>
    ))}
  </div>
);

export { Card };