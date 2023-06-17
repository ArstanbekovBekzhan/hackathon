import React from 'react'
import p from "./Private.module.css"


const Private = () => {
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
            <button className={p.add_btn}>Добавить событие</button>
        </div>
    </div>
  )
}

export  { Private }