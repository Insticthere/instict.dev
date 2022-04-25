const { Client, Intents } = require('discord.js');
require('dotenv').config()
const url = require("url");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES] });

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const http = require('http').createServer(
  async (req, res) => {
    await timeout(3000);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
    let statuscolor;
    const reqUrl = url.parse(req.url).pathname
    const instict = await client.guilds.resolve('678552816117088286').members.fetch('522317353917087745')
    const statusz = await instict.presence
     if(reqUrl === "/status") {

      if(statusz.status in colors) {
        statuscolor = colors[statusz.status]
      } else {
        statuscolor = colors.default;
      }
        res.write(statuscolor)
        res.end()
    } else if (reqUrl === "/activity") {
      statusz.activities.forEach(element => {
        if (element.name === 'Spotify') {
          const obj = {
            name: element.name,
            spotify: element.syncId,
            top: element.assets.largeText,
            artist: element.details,
            album: element.state,
            url: element?.assets?.largeImageURL() || element?.assets?.smallImageURL() || 'https://cdn.discordapp.com/attachments/678552816117088286/724010795801895936/unknown.png',
          }

          res.write(JSON.stringify(obj))
          res.end()
        
        }
      })
    } else if (reqUrl === "/code") {
      statusz.activities.forEach(element => {
        if (element.name === 'Visual Studio Code') {
          const obj = {
            name: element?.name,
            top: element.assets?.largeText,
            artist: element?.details,
            album: element?.state,
            url: element?.assets?.largeImageURL() || element?.assets?.smallImageURL() || 'https://cdn.discordapp.com/attachments/678552816117088286/724010795801895936/unknown.png' ,
          }

          res.write(JSON.stringify(obj))
          res.end()
        
        }
      })
    }
  }
);
const io = require('socket.io')(http, {
  cors: { origin: "*" }
});



let colors = {
    offline: '#747f8d',
    online: '#3ba55d',
    idle: '#faa81a',
    dnd: '#ed4245',
    default: '#747f8d'
  }

  client.once('ready', async () => { 
    console.log('Ready!');
    client.user.setActivity('with the code', { type: 'PLAYING' });
    client.user.setStatus('online');
    client.user.setPresence({
      activity: {
        name: 'with the code',
        type: 'PLAYING'
      },
      status: 'online'
    });
  });

io.on("connection", (socket) => {
  console.log("connected");
  let statuscolor;
  client.on('presenceUpdate', (oldStatus, newStatus) => {
    if (newStatus.userId !== '522317353917087745') return;
    if (newStatus.userId === '522317353917087745') {
      if (newStatus.status !== oldStatus.status) {
        console.log('no activity');
        console.log(newStatus.activities.length)
        if(newStatus.status in colors) {
          statuscolor = colors[newStatus.status]
        } else {
          statuscolor = colors.default;
        }
        socket.emit('color', statuscolor);
      } else if (newStatus) {
        newStatus.activities.forEach(element => {
          if (element.name === 'Spotify') {
            const obj = {
              name: element.name,
              spotify: element.syncId,
              top: element.assets.largeText,
              artist: element.details,
              album: element.state,
              url: element.assets?.largeImageURL(),
            }
            socket.emit('activity', obj);
          }

          oldStatus.activities.forEach(ele => {
            if (ele?.name === 'Spotify' && element.name !== 'Spotify') {
                socket.emit('stop')
            } else if (ele?.name !== 'Spotify' && element.name === 'Spotify') {
              const obj = {
                name: element.name,
                spotify: element.syncId,
                top: element.assets.largeText,
                artist: element.details,
                album: element.state,
                url: element.assets?.largeImageURL(),
              }
              socket.emit('activity', obj);
            }
          })

          if (element.name === 'Visual Studio Code') {
            const obj = {
              name: element?.name,
              top: element.assets?.largeText,
              artist: element?.details,
              album: element?.state,
              url: element?.assets?.largeImageURL(),
            }
            socket.emit('activitycode', obj);
          }

          oldStatus.activities.forEach(ele => {
            if (ele?.name === 'Visual Studio Code' && element.name !== 'Visual Studio Code') {
                socket.emit('stopcode')
            }
          })

        })} 
      }
  })});

http.listen(8081, () => console.log('listening on http://localhost:8081'));

client.login(process.env.TOKEN);