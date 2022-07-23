const client = require("../index").client
const Discord = require('discord.js');
const db = require('quick.db');

const moment = require('moment')
const fs = require('fs')

client.on('messageCreate', async message => {

    if(db.get(`ticketApproved_${message.channel.id}`) === true){
        
        db.add(`stats_ticketsmessages_${message.guild.id}_${message.author.id}`, 1)

        if (message.embeds.length == 0){
          const date = new Date();
          fs.appendFile(`./transcripts/transcript-${message.channel.id}.html`, `
          </style><div class="flex">
          </span><span></span></div></div><div class="parent-container"><div class="avatar-container"><img src="${message.author.displayAvatarURL()}" class="avatar"></div><div class="message-container"><span class="span_name">${message.author.username} ${date.toLocaleString()}</span><span>${message.content}</span></div></div>`,function (err) {
              if (err) throw err
            }
          
          ) 
    
        }
    
        if (message.attachments.size > 0) {
          const date = new Date();
          var Attachtment = (message.attachments.url);
          fs.appendFile(`./transcripts/transcript-${message.channel.id}.html`, `
          </style><div class="flex">
          </span><span></span></div></div><div class="parent-container"><div class="avatar-container"><img src="${message.author.displayAvatarURL()}" class="avatar"></div><div class="message-container"><span class="span_name">${message.author.username} ${date.toLocaleString()}</span><span>${Attachtment}</span></div></div>`,function (err) {
              if (err) throw err
               var Attachment = (message.attachments)
              Attachment.forEach(function(attachment) {
                console.log(attachment.url);
              })
            }
          
            ) 
      
          }
    }

})