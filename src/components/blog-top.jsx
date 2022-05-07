import React from "react"
import style from './blog-top.module.css'

function Blogtop(props) {
  return (
  <div>
      <div className={style['blog-div']}>
        <h1 className={style['blog-title']}>{props.title}</h1>
        <time className={style['blog-time']}>{props.time}</time>
        <h2 className={style['blog-discription']}>{props.discription}</h2>
      </div>
  </div>
  );
}

export default Blogtop;
