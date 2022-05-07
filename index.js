const express = require("express");
var app = express();
require("dotenv").config();
const server = require("http").createServer(app);
const path = require("path");
const { Client, Intents } = require("discord.js");
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES],
});

app.use(express.static(path.join(__dirname, "build")));
// i have no idea why i need both of these but it works this way
app.use(express.static(path.join(__dirname, "client/build")));

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let colors = {
  offline: "#747f8d",
  online: "#3ba55d",
  idle: "#faa81a",
  dnd: "#ed4245",
  default: "#747f8d",
};

client.once("ready", async () => {
  console.log("Ready!");
  client.user.setActivity("with the code", { type: "PLAYING" });
  client.user.setStatus("online");
  client.user.setPresence({
    activity: {
      name: "with the code",
      type: "PLAYING",
    },
    status: "online",
  });
});

io.on("connection", (socket) => {
  let statuscolor;
  console.log("connected");
  client.on("presenceUpdate", (oldStatus, newStatus) => {
    if (newStatus.userId !== "522317353917087745") return;
    if (newStatus.status in colors) {
      statuscolor = colors[newStatus.status];
    } else {
      statuscolor = colors.default;
    }
    socket.emit("color", statuscolor);

    if (newStatus.length !== 0) {
      const oldActivityNames = oldStatus?.activities.map(
        (activity) => activity.name
      );
      const newActivityNames = newStatus?.activities.map(
        (activity) => activity.name
      );

      const activitiesToRemove = oldActivityNames?.filter(
        (activity) => !newActivityNames.includes(activity)
      );

      const events = {
        "Visual Studio Code": {
          stop: () => socket.emit("stopcode"),
        },
        Spotify: {
          stop: () => socket.emit("stop"),
        },
      };
      activitiesToRemove?.forEach((activityName) =>
        events[activityName]?.stop()
      );
      newStatus.activities.forEach((element) => {
        if (element.name === "Spotify") {
          const obj = {
            name: element.name,
            spotify: element.syncId,
            top: element.assets.largeText,
            artist: element.details,
            album: element.state,
            url: element.assets?.largeImageURL(),
          };
          socket.emit("activity", obj);
        } else if (element.name === "Visual Studio Code") {
          const obj = {
            name: element?.name,
            top: element.assets?.largeText,
            artist: element?.details,
            album: element?.state,
            url: element?.assets?.largeImageURL(),
          };
          socket.emit("activitycode", obj);
        }
      });
    }
  });
});

app.get("/status", async function (req, res) {
  await timeout(6000);
  let statuscolor;
  const instict = await client.guilds
    .resolve("678552816117088286")
    .members.fetch("522317353917087745");
  const statusz = await instict.presence;
  if (statusz.status in colors) {
    statuscolor = colors[statusz.status];
  } else {
    statuscolor = colors.default;
  }
  res.send(statuscolor);
  res.end();
});

app.get("/activity", async function (req, res) {
  await timeout(3000);
  const instict = await client.guilds
    .resolve("678552816117088286")
    .members.fetch("522317353917087745");
  const statusz = await instict.presence;
  statusz?.activities.forEach((element) => {
    if (element.name === "Spotify") {
      const obj = {
        name: element.name,
        spotify: element.syncId,
        top: element.assets.largeText,
        artist: element.details,
        album: element.state,
        url:
          element?.assets?.largeImageURL() ||
          element?.assets?.smallImageURL() ||
          "https://cdn.discordapp.com/attachments/678552816117088286/724010795801895936/unknown.png",
      };

      res.write(JSON.stringify(obj));
      res.end();
    }
  });
});

app.get("/code", async function (req, res) {
  await timeout(6000);
  const instict = await client.guilds
    .resolve("678552816117088286")
    .members.fetch("522317353917087745");
  const statusz = await instict.presence;
  statusz?.activities.forEach((element) => {
    if (element.name === "Visual Studio Code") {
      const obj = {
        name: element?.name,
        top: element.assets?.largeText,
        artist: element?.details,
        album: element?.state,
        url:
          element?.assets?.largeImageURL() ||
          element?.assets?.smallImageURL() ||
          "https://cdn.discordapp.com/attachments/678552816117088286/724010795801895936/unknown.png",
      };

      res.write(JSON.stringify(obj));
      res.end();
    }
  });
});

app.get("/instic", async function (req, res) {
  res.sendFile(path.join(__dirname + "/public/instic.html"));
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

let port = process.env.PORT;

if (port == null || port === "") {
  port = 8000;
}

client.login(process.env.TOKEN);
server.listen(port, () => {
  console.log("deployed");
});
