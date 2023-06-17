import React from "react";
import {Link} from "react-router-dom"
import './form.css'

const Form = () => {
  return (
    <div className="content">
      <form action="" className="form">
        <h2 className="form_title">Регистрация</h2>
        <h2 className="form_title">Придумай проль для входа на любом устройстве</h2>
        <input className="form_field" type="text" />
        <button className="form_btn" type="button">Продолжить</button>
        <input className="form_field" type="text" />
        <button className="form_btn" type="submit">Создать аккаунт</button>

        <Link to="/login">У меня есть аккаунт</Link>



      </form>

    </div>
  )
}
export default Form 