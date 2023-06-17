import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <div>
<footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>О нас </h3>
          <p>
          Мы - команда проекта "Активный гражданин". Наш веб-сайт облегчает коммуникацию между гражданами и государственными службами, предоставляя контактные данные, возможность анонимного сообщения о проблеме и информацию о функционировании служб. Мы поощряем активность граждан и стремимся улучшить нашу страну.
          </p>
        </div>
        <div className="footer-column">
          <h3>Contact</h3>
          <p>Email: info@example.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy;2023 Your Website. All rights reserved.</p>
      </div>
    </footer>
</div>
  )
}

export default Footer