import LazyLoad from "react-lazyload";
import React, {useEffect} from "react";
import { io } from "socket.io-client";
const axios = require("axios");

function About() {
  const [spotify, setspotify] = React.useState();
  const [code, setcode] = React.useState();
  useEffect(() => {
    const socket = io();
    socket.on("activity", (activity) => {
      setspotify(activity);
    });
    socket.on("stop", (activity) => {
      setspotify();
    });
    socket.on("stopcode", (activity) => {
      setcode();
    });
    
    socket.on("activitycode", (activity) => {
      setcode(activity);
    });

    axios.get('/code').then(res => {
      setcode(res.data);
    });

    axios.get("/activity").then((res) => {
      setspotify(res.data);
    });
  }, []); 
  return (
      <section className="info flex" >
        <LazyLoad>
          <img src='./asset/avatar.jpg' alt='avatar' width="280" height="280" sizes="280px" decoding="async" className='avatar' />
        </LazyLoad>
        <h1 className='title'>Instict</h1>
        <p className='description'>
            <a href="/I">I</a> am <a href="/Instic">Instict.</a>
        </p>
        <p>

        </p>
        <div>
        {(spotify || code) && <h2 className='subtitle blogheading'>Activity</h2>}
          {spotify  && <div>
            <div className='activity-item'>
                      <img src={spotify.url} alt='activity' className="activity-item-image"/>
                    <div className='activity-item-info'>
                      <h3 className='activity-item-title'>{spotify.name}</h3>
                      <a href={`https://open.spotify.com/track/${spotify.spotify}`}> 
                        <p className='activity-item-description'>{spotify.artist} - {spotify.album}</p>
                      </a>
                    </div>
              </div>
          </div>}
          {code  && <div>
            <div className='activity-item'>
                      <img src={code.url} alt='activity' className="activity-item-image"/>
                    <div className='activity-item-info'>
                      <h3 className='activity-item-title'>{code.name}</h3>
                      <p>{code.top}</p>
                      <p>{code.album}</p>
                      <p>{code.artist}</p>
                    </div>
              </div>
          </div>}
        </div>          
      </section>
  );
}

export default About;