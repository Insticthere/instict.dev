import React, {useEffect} from "react";
import Headroom from "react-headroom";
import axios from "axios";
import { io } from "socket.io-client";

function Nav(props) {
  const [colors, setcolor] = React.useState([]);
  useEffect(() => {
    axios.get("/status").then((res) => {
      setcolor(res.data);
      console.log(res.data);
    });
    const socket = io();
    socket.on("color", (color) => {
      setcolor(color);
    });
  }, []);
  return (
    <Headroom>
      <nav className='nav'>
          <div className='navbar'>
              <div className='navele'>
                  <div className='navimg'>
                    <div>
                      <a href="/">
                        <img src='./asset/avatar.jpg' alt='avatar' className='navavatar' />
                      </a>
                    </div>
                      <div className='status' id='status' style={{backgroundColor: colors || '#747f8d'}}></div>
                  </div>
              </div>
          </div>
      </nav>
    </Headroom>
  );
}

export default Nav;
