import React from "react"
import './blog-top.css'

function Blogtop(props) {
  return (
  <div>
      <div className="blogs-div">
        <h1 className='blogs-title'>{props.title}</h1>
        <time className="blog-time">{props.time}</time>
        <h2 className="blog-discription">{props.discription}</h2>
      </div>
  </div>
  );
}

export default Blogtop;
