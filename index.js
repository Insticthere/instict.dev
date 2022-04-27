const express = require('express');
var app = express();
const server = require('http').createServer(app);
const path = require('path');
const { Client, Intents } = require('discord.js');
require('dotenv').config()
const io = require('socket.io')(server, {
  cors: { origin: "*" }
});
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES] });

app.use(express.static(path.join(__dirname, 'build')));

app.use(express.static(path.join(__dirname, 'client/build')));

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
        console.log(newStatus.activities.length)
        if(newStatus.status in colors) {
          statuscolor = colors[newStatus.status]
        } else {
          statuscolor = colors.default;
        }
        socket.emit('color', statuscolor);  
        if (newStatus) {
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

        });
      } 
  })
});

io.on("connection", (socket) => {
  console.log("connected");
  client.on('presenceUpdate', (oldStatus, newStatus) => {
    if (newStatus.userId !== '522317353917087745') return;
    if (newStatus) {
      oldStatus.activities.forEach(element => {
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
          } else if (element.name === 'Visual Studio Code') {
            const obj = {
              name: element?.name,
              top: element.assets?.largeText,
              artist: element?.details,
              album: element?.state,
              url: element?.assets?.largeImageURL(),
            }
            socket.emit('activitycode', obj);
          } else if (element.name === 'Spotify' && element.name !== 'Spotify') {
            socket.emit('stop')
          } else if (element.name === 'Visual Studio Code' && element.name !== 'Visual Studio Code') {
            socket.emit('stopcode')
          }
        })
    })
    } 
  })
});


app.get('/status', async function (req, res) {
  await timeout(3000);
  let statuscolor;
  const instict = await client.guilds.resolve('678552816117088286').members.fetch('522317353917087745')
  const statusz = await instict.presence
  if(statusz.status in colors) {
    statuscolor = colors[statusz.status]
  } else {
    statuscolor = colors.default;
  }
    res.send(statuscolor)
    res.end()
});

app.get('/activity', async function (req, res) {
  await timeout(3000);
  const instict = await client.guilds.resolve('678552816117088286').members.fetch('522317353917087745')
  const statusz = await instict.presence
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
});

app.get('/code', async function (req, res) {
  await timeout(3000);
  const instict = await client.guilds.resolve('678552816117088286').members.fetch('522317353917087745')
  const statusz = await instict.presence
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
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let port = process.env.PORT;
if (port == null || port === "") {
  port = 8000;
}
client.login('OTU1Mzc2OTQ1Mjc1NzQ0Mjk2.YjgyHQ.nhcGr3EWTWOEvVMe5bFs2x-l5YU');
server.listen(port, () => {
  console.log('deployed');
});