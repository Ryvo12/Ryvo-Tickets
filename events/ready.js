const Discord = require('discord.js');
const client = require("../index").client
const { createCmd } = require('../dataHandler');
client.on('ready', () => {
    
            client.user.setActivity(`Ryvo | WHMCS`,{ type: 'WATCHING' });

      createCmd(client, '999228759188185118') // vul tussen de '' je guild id in zodat alle commando's aangemaakt kunnen worden.
  });
  


