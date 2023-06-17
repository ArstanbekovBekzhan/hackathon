import React from 'react'
import p from "./private.module.css"
const Private = () => {
  return (
    <div> 
        <div className={p.container}>
        <img src="" alt="#" />
        <h2 className={p.name}></h2>
        <div className={p.red_box}></div>
        <div className={p.green_box}></div>
        </div>
        <div className={p.card_desk}>
            <button className={p.add_btn}></button>
        </div>
    </div>
  )
}

export  { Private }