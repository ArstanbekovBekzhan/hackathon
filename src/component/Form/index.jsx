import React from "react";
import {Link} from "react-router-dom"
import './form.css'
import {useState} from React

const Form = () => {

  const [status, setStatus] = useState(false)


  return (
    <div className="content">
      <form action="" className="form">
        <h2 className="form_title">Регистрация</h2>
        <h2 className="form_title">
          {
            status ? 'Придумай пароль для входа на любом устройстве' : 'Регистрация'
          }
        </h2>

        {
          status ? <>
              <input className="form_field" placeholder="Придумайте пароль" type="text" />
              <button className="form_btn" type="submit">Создать аккаунт</button>

          </> : <>
              <input className="form_field" placeholder="Введите Email" type="text" />
              <button onClick={() => setStatus(true)} className="form_btn" type="button">Продолжить</button>
              <Link to="/login">У меня есть аккаунт</Link>
          </>
        }
       
        

        



      </form>

    </div>
  )
}
export default Form 