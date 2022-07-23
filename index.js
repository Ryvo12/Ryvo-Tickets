const { Client, Intents, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS], allowedMentions: { parse: ['users', 'roles']} });

const fs = require('fs');
const yaml = require('js-yaml')

function loadFile(file){
    return myFile = yaml.load(fs.readFileSync(`${file}`, 'utf8'))
  }
  
client.config = loadFile(`./config/config.yml`)
const date = new Date();
client.on('ready', () => {
    console.log(`Created by Ryvo`)
    console.log(`Created for ${client.user.username}`)
    console.log(`Copyright | ${date.toLocaleString()} | Ryvo | Ryvo Development`)
    console.log(`\n\nIngelogd als ${client.user.tag}`)
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.SlashCmds = new Discord.Collection();
module.exports.client = client


fs.readdirSync('./slashcommands/').forEach(dir => {
    fs.readdir(`./slashcommands/${dir}`, (err, files) => {
        if(err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        
        jsFiles.forEach(file => {
            var fileGet = require(`./slashcommands/${dir}/${file}`);
            // console.log(`     ┃Command Successfully loaded | ${file}`)
            try {
                client.SlashCmds.set(fileGet.help.name, fileGet);
            } catch (err) {
                return console.log(err);
            }
        });
    });
});


fs.readdirSync(`./events/`).forEach(dir => {
    var jsFiles = fs.readdirSync('./events/').filter(f => f.split(".").pop() === "js");
    jsFiles.forEach(event => {
        const eventGet = require(`./events/${event}`)
   
        try {
            client.events.set(eventGet.name, eventGet)
        } catch(err) {
            return console.log(err)
        }
    })
})



client.login(client.config.token)