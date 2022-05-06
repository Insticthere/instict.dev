import React from "react"
import Nav from "../../navbar";
import style from './unnie.module.css'
import Blogtop from "../../blog-top";
function Unnie() {
  return (
  <div className="unnie">
      <Nav />
      <div className={style.unniecontainer}>
      <Blogtop 
      title="Unnie" 
      time="12 January 2022" 
      discription="An open source discord bot."
        />
          <div className={style.unniecontent}>
            <p className={style.unnietext}>Unnie means older sister in Korean, OPPA is a multi purpose bot for discord, it can be used for many things, but mainly for fun, utility, moderation. Find the github <a href="https://github.com/Insticthere/unnie" className={style.link}>here</a>.</p>
              <div>
              <h1 className={style.unnieheader}>Commands</h1>
              <h2 className={style.subtit}>Utility and Moderation</h2>
              <code className={style.code}>{">"} ticket</code>
              <p className={style.unnietext}>This creates an ticket in the appropriate channel.</p>
              <code className={style.code}>{">"} send</code>
              <p className={style.unnietext}>sends an embed to an channel.</p>
              <code className={style.code}>{">"} ban</code>
              <p className={style.unnietext}>ban's a user.</p>
              <code className={style.code}>{">"} kick</code>
              <p className={style.unnietext}>This kick's an user.</p>
              <code className={style.code}>{">"} info</code>
              <p className={style.unnietext}>get info on the server or a user.</p>
              <h2>Fun</h2>
              <code className={style.code}>{">"} 8ball</code>
              <p className={style.unnietext}>Ask the magic 8ball a question.</p>
              <code className={style.code}>{">"} meme</code>
              <p className={style.unnietext}>Get a random meme.</p>
              <h1 className={style.unnieheader}>Hosting</h1>
              <h3 className={style.unnietext}>You can easily host this bot using heroku.  Note: this method is currently on hold from heroku team side.</h3>
              <p className={style.steps}>Step 1: Create a heroku account and make an new app </p>
              <img src="https://i.gyazo.com/07986ef66663829059b8586b37f6ecc9.png" alt="img" />
              <img src="https://i.gyazo.com/d1f7089340f7981b2340d7d21ca52eb4.png" alt="img" />
              <p className={style.steps}>Step 2: Now add an build pack</p>

              <img src="https://i.gyazo.com/3243ac607f0c02f8c85675713495c445.png" alt="img" />
              <img src="https://i.gyazo.com/dd70d215acd9b41d367a9f9ef1b1ff58.png" alt="img" />

              <p className={style.steps} >Step 3: Now login with github</p>
              <img src="https://i.gyazo.com/9a7a915b20d209bd80a72dff46b88f56.png" alt="img" />
              <img src="https://i.gyazo.com/d8c101b7cff9e6d4e25a6f73113afdf9.png" alt="img"></img>
              <p className={style.steps}>full tutorial when heroku works with github.</p>




            </div>


          </div>
          <style>
            {`img {
              max-width: 100%;
              max-height: 100%;
            }`}
          </style>
        </div>
  </div>
  );
}

export default Unnie;
