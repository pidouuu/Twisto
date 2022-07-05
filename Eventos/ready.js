const Discord = require('discord.js')
const mongoose = require("mongoose")
const express = require('express')
module.exports = async (client) => {
  
  client.invites = {}
  for (guild of client.guilds.cache.values()) {
    client.invites[guild.id] = await guild.invites.fetch()
  }

  client.slashCommands.forEach(async (c, g) => {
    const comandos = await client.application.commands.fetch()
    if (!comandos.find(x => x.name === c.name)) {
      client.application.commands.create(c).then(console.log(`Registrado ${c.name}`)).catch(e => console.error(`No se pudo registrar el comando ${c.name} por`, e))
    }
  })

  function estado() {
    let estados = [{
      name: ',ayuda',
      type: 'PLAYING'
    }, {
      name: `${client.guilds.cache.size.toLocaleString()} Servers!`,
      type: 'WATCHING'
    }]
    client.user.setPresence({
      status: "online",
      activities: [estados[Math.floor(estados.length * Math.random())]]
    })
  }
  setInterval(estado, 300000)

  mongoose.connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(() => console.log("DB Conectada")).catch(e => console.log(e))

  let app = express()
  app.get('/', (req, res) => res.send('Lindo'))
  app.listen(3000)
  
  console.log(`${client.user.username} Conectado!`)
}