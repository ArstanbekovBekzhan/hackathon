import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SDCard from "./Details.module.css";
import CardMap from '../../component/Cards/CardMap';
import Comment from "../../component/Comments/comments";
import { Modal, Button } from "react-bootstrap";

const CardDetails = () => {
  const [backgroundColor, setBackgroundColor] = useState("");
  const { id } = useParams();
  const [address, setAddress] = useState("");
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    type: '',
    description: '',
    photo: null
  });
  const [answerImage, setAnswerImage] = useState(null);
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

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalData({
      type: '',
      description: '',
      photo: null
    });
    setAnswerImage(null);
  };

  const handleModalInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setModalData((prevData) => ({
        ...prevData,
        photo: files[0],
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setAnswerImage(e.target.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setModalData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('type', modalData.type);
      formData.append('description', modalData.description);
      formData.append('answer_img', modalData.photo);

      await axios.put(`http://localhost:3000/cards/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setCard((prevCard) => ({
        ...prevCard,
        answer: modalData.type,
        answer_text: modalData.description,
        answer_img: answerImage
      }));
    } catch (error) {
      console.error('Error updating card:', error);
    }
    handleModalClose();
  };

  const updateCardMade = async () => {
    try {
      await axios.put(`http://localhost:3000/cards/${id}`, {
        ...card,
        made: true
      });
      setCard((prevCard) => ({
        ...prevCard,
        made: true
      }));
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  useEffect(() => {
    getRandomGradient();
  }, []);

  return (
    <div className={SDCard.containerDetail}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ background: backgroundColor }} className={SDCard.ContentDetails}>
          <div className={SDCard.Black}>
            <Button onClick={goBack} />
          </div>
          <div className={SDCard.Details}>
            <div className={SDCard.left}>
              <img src={card.image} alt="" />
            </div>
            <div className={SDCard.right}>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
              <h4>{address}</h4>
              {
                !card.made ? <div> <Button onClick={handleModalOpen}>Добавить</Button>
                {showModal && (
                  <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Модальное окно</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form onSubmit={handleModalSubmit}>
                        <div className={SDCard.cc}>
                          <input
                            type="text"
                            name="type"
                            placeholder="Тип"
                            value={modalData.type}
                            onChange={handleModalInputChange}
                          />
                          <textarea
                            name="description"
                            placeholder="Описание"
                            value={modalData.description}
                            onChange={handleModalInputChange}
                          ></textarea>
                          <input
                            type="file"
                            name="photo"
                            onChange={handleModalInputChange}
                          />
                          {answerImage && (
                            <img src={answerImage} alt="Answer" />
                          )}
                        </div>
                      </form>
                    </Modal.Body>
                    <Modal.Footer className={SDCard.cc2}>
                      <Button variant="secondary" onClick={handleModalClose}>
                        Отменить
                      </Button>
                      <Button variant="primary" onClick={updateCardMade}>
                        Сохранить
                      </Button>
                    </Modal.Footer>
                  </Modal>
                )}</div> : <div className={SDCard.answer}>
                  <h4>{card.answer}</h4>
                  <p>{card.answer_text}</p>
                  <img src={card.answer_img} alt="" />
                </div>
              }
            </div>
          </div>
          <CardMap address={address} />
        </div>
      )}
      <div className={SDCard.box_comment}>
        <h1 className={SDCard.title_comment}>Коментарий</h1>
        <Comment cardId={id} />
      </div>
    </div>
  );
};

export { CardDetails };
