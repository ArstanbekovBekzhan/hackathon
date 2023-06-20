// import React, {useState} from "react";
// import {Link} from "react-router-dom"
// import './form.css'
// import { FaPencilAlt } from 'react-icons/fa';
// import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
// import axios from "axios";
// const Form = () => {

//   const [status, setStatus] = useState(false)
//   const [email, setEmail] = useState('')
//   const [eye, setEye] = useState(false)
//   const registerUser = (e) => {
//     e.preventDefault()
//     let newUser = {
//       email,
//       password: e.target[0].value  

//     }
//     axios.post('http://localhost:8080/register', newUser)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err.message))
//     console.log()
//   }

//   return (
//     <div className="content">
//       <form action="" className="form" onSubmit={registerUser}>
//         {
//           status && <p className="form_email" onClick={() => setStatus(false)}>{email}<FaPencilAlt/></p> 

//         }

//         <h2 className="form_title">
//           {
//             status ? 'Придумай пароль для входа на любом устройстве' : 'Регистрация'
//           }

//        </h2>

//         {
//           status && <>

//               <div className="form_password">
//                 <input className="form_field" placeholder="Придумайте пароль" type={eye ? 'text' : 'password'}/>
//                 <span className="form_eye" onClick={() => setEye(prev => !prev)}>
//                   {
//                     eye ? <AiFillEyeInvisible/> : <AiFillEye/>

//                   }
//                 </span>
//               </div>
//               <button className="form_btn" type="submit">Создать аккаунт</button>

//           </>
//         } 

//         {
//           !status &&
//            <>
//               <input value={email} onChange={(e) => setEmail(e.target.value)} className="form_field" placeholder="Введите Email" type="text" />
//               <div onClick={() => setStatus(true)} className="form_btn">Продолжить</div>
//               <Link to="/login">У меня есть аккаунт</Link>
//           </>
//         }
       
  
//       </form>

//     </div>
//   )
// }
// export default Form 