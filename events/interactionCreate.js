const Discord = require('discord.js');
const db = require('quick.db');
const client = require("../index").client
const { Permissions } = require('discord.js');
const moment = require('moment');
const fs = require('fs');

client.on('interactionCreate', async (inter) => {

    if(inter.isCommand()){
        let slashCmds = client.SlashCmds.get(inter.commandName)
        if(slashCmds) slashCmds.run(client, inter)
    }

    if(inter.isContextMenu()){
        let slashCmds = client.SlashCmds.get(inter.commandName)
        if(slashCmds) slashCmds.run(inter)
    }
// Unban Event
if(inter.isSelectMenu()){

    if (inter.values[0] === 'unban') {

            if(db.get(`ticket_${inter.user.id}`) === true){
                const alreadyOpen = new Discord.MessageEmbed()
                    .setDescription(`Je hebt momenteel al een ticket open!\nSluit deze eerst voordat je een nieuwe opent!`)
                    .setColor(client.config.color)
                return await inter.reply({ embeds: [alreadyOpen], ephemeral: true })
            }
        
            const everyoneRole = inter.guild.roles.cache.find(x => x.name === "@everyone").id;
            inter.guild.channels.create(`unban-${inter.user.username}`, { type: 'text', permissionOverwrites: [
                {
                    id: everyoneRole,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                },
                {
                    id: inter.user.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                },
                {
                    id: client.config.staff,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                }
            ], topic: inter.user.id, parent: client.config.unbanticket}).then(async c => {
        
                
            const date = new Date();
                fs.appendFile(`./transcripts/transcript-${c.id}.html`, `
                <!--Goeiedag lezer!>
        Om dit ticket transcript duidelijk te lezen dien je hem te downloaden en te openenen naar je browser
        ----------------------------------------- -->
        
        <style>
                /* raleway-800 - latin */
                @font-face {
                    font-family: 'Raleway';
                    font-style: normal;
                    font-weight: 800;
                    src: url('../fonts/raleway-v19-latin-800.eot');
                    /* IE9 Compat Modes */
                    src: local(''),
                        url('../fonts/raleway-v19-latin-800.eot?#iefix') format('embedded-opentype'),
                        /* IE6-IE8 */
                        url('../fonts/raleway-v19-latin-800.woff2') format('woff2'),
                        /* Super Modern Browsers */
                        url('../fonts/raleway-v19-latin-800.woff') format('woff'),
                        /* Modern Browsers */
                        url('../fonts/raleway-v19-latin-800.ttf') format('truetype'),
                        /* Safari, Android, iOS */
                        url('../fonts/raleway-v19-latin-800.svg#Raleway') format('svg');
                    /* Legacy iOS */
                }
            
                body {
                    background-color: #242529;
                    color: #dcddde;
                    font-family: "Raleway", sans-serif;
                    font-size: 16px;
                    font-weight: 800;
                    margin: 0;
                    padding: 0;
                    background-image: url("https://cdn.discordapp.com/attachments/922909468524687370/988474663753633802/Nieuw_project_10.png");
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                }
            
                .flex {
                    display: flex;
                    justify-content: space-between;
                }
            
                .message-container {
                    display: flex;
                    flex-direction: column;
                    padding-left: 15px;
                }
            
                .copyright {
                    position: fixed;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    background-color: red;
                    color: white;
                    text-align: center;
                }
            
                .parent-container {
                    padding: 25px;
                    display: flex;
                    margin: 20px;
                    background-color: #242529;
                    border-radius: 20px;
                }
            
                .avatar {
                    border-radius: 50%;
                    height: 50px;
                    width: 50px;
                }
            
                .message-container .span_name{
                    color: #5865F2;
                }
            
                .info__guild-name {
                    font-size: 1.4em;
                }
            
                .info {
                    display: flex;
                    justify-content: space-between;
                    max-width: 100%;
                    padding: 10px;
                    margin: 20px;
                    background-color: #242529;
                    border-radius: 20px;
                    width: 50%;
                }
            
                .info__channel-name {
                    font-size: 1.2em;
                }
            
                .info__guild-icon {
                    max-width: 88px;
                    max-height: 88px;
                }
            
                .info__metadata {
                    flex: 1;
                    margin-left: 50px;
                    justify-self: center;
                    align-self: center;
                }
            
                .info__guild-icon-container {
                    flex: 0;
                }
            </style><div class="flex"><div class="info"><div class="info__guild-icon-container"><img src="https://cdn.discordapp.com/attachments/997395696011456632/999712736923623474/denistyWHMCS3.png" width="150"></div><div class="info__metadata"><div class="info__guild-name">${inter.guild.name}</div><div class="info__channel-name">Eigenaar Ticket: ${inter.user.username}</div><div class="info__channel-message-count">${date.toLocaleString()}</div></div></div><div class="info"><div class="info__metadata"><div class="info__guild-name">${inter.guild.name} 2022 </div></div></div></div><div class="parent-container"><div class="avatar-container"><img src="https://cdn.discordapp.com/attachments/922909468524687370/988473882694537226/trappingpng.png" class="avatar"></div><div class="message-container"><span class="span_name">${client.user.username} ${date.toLocaleString()}</span><span> Beste ${inter.user.username} bedankt voor het openen van een Algemene Ticket het Support Team van ${inter.guild.name} zal u zsm helpen! \n\nKunt u alvast uw probleem of vragen willen uitleggen zodat het staff team jou sneller & beter kan helpen.</span></div></div></div></div><span></span></div></div>
          `, function (err) {
                    if (err) throw err;
                });
        
                await inter.reply({content: `Your ticket has been created, view your ticket in ${c}`, ephemeral: true})


                const button = new Discord.MessageActionRow()
                .addComponents(
                 new Discord.MessageButton()
                .setCustomId('close')
                .setEmoji('🗑️')
                .setStyle('SECONDARY')
                )

               
        
        
                const thanksEmbed = new Discord.MessageEmbed()
            .setColor(client.config.color)
            .setAuthor(`Order Ticket`, inter.guild.iconURL())
            .setDescription(`Welcome to your ticket, our support team is ready to help you!
            Explain your problem in advance so that we can help you as soon as possible!

            **Available Ticket Commands!** :arrow_heading_down:
                    > \`/add\` - Add a user to this ticket
                    > \`/remove\` - Remove a user from this ticket
                    > \`/rename\` - Rename the ticket channel
                    > \`/close\` - Delete a ticket channel
            
            You can execute these commands via our slash commands.
            
            *Kind regards,*
		*Ryvo | WHMCS Staff Team*
        `)  
            .setFooter('© Denisty | Whmcs', 'https://cdn.discordapp.com/attachments/997395696011456632/999712736923623474/denistyWHMCS3.png')
            c.send({ content: `${inter.user} Welcome in your ticket! :wave:`, embeds: [thanksEmbed], components: [button] })
                   
        
                    db.set(`ticketApproved_${c.id}`, true)
                    db.set(`ticket_${inter.user.id}`, true)
        
            });
        
        }
        
    }
        
        //test close
        if(inter.customId === "close"){

            if(db.get(`ticketApproved_${inter.channel.id}`) != true){
                const ticketChannel = new Discord.MessageEmbed()
                    .setDescription(`You can only run this command in a ticket!\nTry again in a ticket!`)
                    .setColor(client.config.color)
                    inter.reply({ embeds: [ticketChannel], ephemeral: true })
            }
        
            const succesEmbed = new Discord.MessageEmbed()
                .setDescription(`This ticket has been successfully deleted!\nAnd will be deleted in: \`5\` seconds!`)
                .setColor(client.config.color)
                .setAuthor(`${client.user.username} Tickets`, inter.guild.iconURL())
                .addField(`Closed by:`, `${inter.user}`, true)
                .setTimestamp()
                .setThumbnail(inter.guild.iconURL())
            inter.reply({ embeds: [succesEmbed] })
            
            
            const user = client.users.cache.find(x => x.id === inter.channel.topic)
    const logafgeleverd = new Discord.MessageEmbed()
        .setTitle(`Logs-Ticket-Close Command Usage`)
        .setColor(client.config.color)
        .setDescription(`Used by: ${inter.user}\nOwner Tickett : ${user} | ${user.id}\n Channel: ${inter.channel.name}`)
        .setTimestamp()
        .setFooter('Close Command', client.config.thumbnail)
  const log = inter.guild.channels.cache.find(x => x.id === client.config.logs)
     log.send({embeds: [logafgeleverd], files: [`./transcripts/transcript-${inter.channel.id}.html`] })
            
            
            const pm = new Discord.MessageEmbed()
                .setDescription(`Your ticket is closed\n \n If you have any further questions, you can make a new ticket`)
                .setColor(client.config.color)
                .setAuthor(`Closed Ticket`, inter.guild.iconURL())
                .addField(`Closed by:`, `${inter.user}`, true)
                .setTimestamp()
                .setThumbnail(inter.guild.iconURL())
             user.send({embeds: [pm], files: [`./transcripts/transcript-${inter.channel.id}.html`] })
        
            db.delete(`ticketApproved_${inter.channel.id}`)
            db.delete(`ticket_${inter.channel.topic}`)
        
            setTimeout(() => {
                inter.channel.delete()
            }, 5000)
        
        }

	
        
        
        
        
        
        
        //
        // Refund Event
        if(inter.isSelectMenu()){

            if (inter.values[0] === 'refund') {
    
            if(db.get(`ticket_${inter.user.id}`) === true){
                const alreadyOpen = new Discord.MessageEmbed()
                    .setDescription(`You currently already have a ticket open!\nPlease close it before opening a new one!`)
                    .setColor(client.config.color)
                return await inter.reply({ embeds: [alreadyOpen], ephemeral: true })
            }
        
            const everyoneRole = inter.guild.roles.cache.find(x => x.name === "@everyone").id;
            inter.guild.channels.create(`refund-${inter.user.username}`, { type: 'text', permissionOverwrites: [
                {
                    id: everyoneRole,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                },
                {
                    id: inter.user.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                },
                {
                    id: client.config.staff,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                }
            ], topic: inter.user.id, parent: client.config.refundticket}).then(async c => {
        
                await inter.reply({content: `Your ticket has been created, view your ticket in ${c}`, ephemeral: true})
                const date = new Date();
                fs.appendFile(`./transcripts/transcript-${c.id}.html`,  `  <!--Good day reader!>
                To read this ticket transcript clearly, please download and open it to your browser
                ----------------------------------------- -->
                
                <style>
                        /* raleway-800 - latin */
                        @font-face {
                            font-family: 'Raleway';
                            font-style: normal;
                            font-weight: 800;
                            src: url('../fonts/raleway-v19-latin-800.eot');
                            /* IE9 Compat Modes */
                            src: local(''),
                                url('../fonts/raleway-v19-latin-800.eot?#iefix') format('embedded-opentype'),
                                /* IE6-IE8 */
                                url('../fonts/raleway-v19-latin-800.woff2') format('woff2'),
                                /* Super Modern Browsers */
                                url('../fonts/raleway-v19-latin-800.woff') format('woff'),
                                /* Modern Browsers */
                                url('../fonts/raleway-v19-latin-800.ttf') format('truetype'),
                                /* Safari, Android, iOS */
                                url('../fonts/raleway-v19-latin-800.svg#Raleway') format('svg');
                            /* Legacy iOS */
                        }
                    
                        body {
                            background-color: #242529;
                            color: #dcddde;
                            font-family: "Raleway", sans-serif;
                            font-size: 16px;
                            font-weight: 800;
                            margin: 0;
                            padding: 0;
                            background-image: url("https://cdn.discordapp.com/attachments/893565414347530292/999723913485488159/whmcsbanner.png");
                            background-size: cover;
                            background-position: center;
                            background-attachment: fixed;
                        }
                    
                        .flex {
                            display: flex;
                            justify-content: space-between;
                        }
                    
                        .message-container {
                            display: flex;
                            flex-direction: column;
                            padding-left: 15px;
                        }
                    
                        .copyright {
                            position: fixed;
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            background-color: red;
                            color: white;
                            text-align: center;
                        }
                    
                        .parent-container {
                            padding: 25px;
                            display: flex;
                            margin: 20px;
                            background-color: #242529;
                            border-radius: 20px;
                        }
                    
                        .avatar {
                            border-radius: 50%;
                            height: 50px;
                            width: 50px;
                        }
                    
                        .message-container .span_name{
                            color: #5865F2;
                        }
                    
                        .info__guild-name {
                            font-size: 1.4em;
                        }
                    
                        .info {
                            display: flex;
                            justify-content: space-between;
                            max-width: 100%;
                            padding: 10px;
                            margin: 20px;
                            background-color: #242529;
                            border-radius: 20px;
                            width: 50%;
                        }
                    
                        .info__channel-name {
                            font-size: 1.2em;
                        }
                    
                        .info__guild-icon {
                            max-width: 88px;
                            max-height: 88px;
                        }
                    
                        .info__metadata {
                            flex: 1;
                            margin-left: 50px;
                            justify-self: center;
                            align-self: center;
                        }
                    
                        .info__guild-icon-container {
                            flex: 0;
                        }
                    </style><div class="flex"><div class="info"><div class="info__guild-icon-container"><img src="https://cdn.discordapp.com/attachments/998007503386333254/999229981517426729/34515332-6CDC-45A0-9D07-855237DF7503__1_-removebg-preview.png" width="150"></div><div class="info__metadata"><div class="info__guild-name">${inter.guild.name}</div><div class="info__channel-name">Eigenaar Ticket: ${inter.user.username}</div><div class="info__channel-message-count">${date.toLocaleString()}</div></div></div><div class="info"><div class="info__metadata"><div class="info__guild-name">${inter.guild.name} 2022 </div></div></div></div><div class="parent-container"><div class="avatar-container"><img src="https://cdn.discordapp.com/attachments/922909468524687370/988473882694537226/trappingpng.png" class="avatar"></div><div class="message-container"><span class="span_name">${client.user.username} ${date.toLocaleString()}</span><span>Beste ${inter.user}, Bedankt voor het openen van een Klacht Ticket.\nHet Staff Team van Trappin zal u zo snel mogelijk helpen! \n </span></div></div></div></div><span></span></div></div>
                  
                `, function (err) {
                    if (err) throw err;
                });
        
        
                
                const button = new Discord.MessageActionRow()
                .addComponents(
                 new Discord.MessageButton()
                .setCustomId('close')
                .setEmoji('🗑️')
                .setStyle('SECONDARY')
                )
                
                
                
                
                const thanksEmbed = new Discord.MessageEmbed()
            .setColor(client.config.color)
            .setAuthor(`Support Ticket`, inter.guild.iconURL())
            .setDescription(`Welkom in je ticket, ons support team staat klaar om je te helpen!
		Leg alvast je probleem uit zodat wij jou zo snel mogelijk kunnen helpen!

		**Beschikbare Ticket Commands!** :arrow_heading_down:
        > \`/add\` - Voeg een gebruiker toe aan deze ticket
        > \`/remove\` - Verwijder een gebruiker uit deze ticket
        > \`/rename\` - Hernoem het ticket kanaal
        > \`/close\` - Verwijder een ticket kanaal

		Deze commands kun je uitvoeren via onze slash commands.

		*Met vriendelijke groeten,*
		*Trappin Staff Team*
        `)  
            .setFooter('© Denisty | Whmcs', 'https://cdn.discordapp.com/attachments/997395696011456632/999712736923623474/denistyWHMCS3.png')
            c.send({ content: `${inter.user} Welkom in je ticket! :wave:`, embeds: [thanksEmbed], components: [button] })
        
                    db.set(`ticketApproved_${c.id}`, true)
                    db.set(`ticket_${inter.user.id}`, true)
        
            });
        }
        }
        // Klacht Event
        if(inter.isSelectMenu()){

            if (inter.values[0] === 'klacht') {
    
            if(db.get(`ticket_${inter.user.id}`) === true){
                const alreadyOpen = new Discord.MessageEmbed()
                    .setDescription(`Je hebt momenteel al een ticket open!\nSluit deze eerst voordat je een nieuwe opent!`)
                    .setColor(client.config.color)
                return await inter.reply({ embeds: [alreadyOpen], ephemeral: true })
            }
        
            const everyoneRole = inter.guild.roles.cache.find(x => x.name === "@everyone").id;
            inter.guild.channels.create(`klacht-${inter.user.username}`, { type: 'text', permissionOverwrites: [
                {
                    id: everyoneRole,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                },
                {
                    id: inter.user.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                },
                {
                    id: client.config.staff,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                }
            ], topic: inter.user.id, parent: client.config.klachtticket}).then(async c => {
        
                await inter.reply({content: `Je ticket is aangemaakt, bekijk je ticket in ${c}`, ephemeral: true})
                const date = new Date();
                fs.appendFile(`./transcripts/transcript-${c.id}.html`,  `  <!--Goeiedag lezer!>
                Om dit ticket transcript duidelijk te lezen dien je hem te downloaden en te openenen naar je browser
                ----------------------------------------- -->
                
                <style>
                        /* raleway-800 - latin */
                        @font-face {
                            font-family: 'Raleway';
                            font-style: normal;
                            font-weight: 800;
                            src: url('../fonts/raleway-v19-latin-800.eot');
                            /* IE9 Compat Modes */
                            src: local(''),
                                url('../fonts/raleway-v19-latin-800.eot?#iefix') format('embedded-opentype'),
                                /* IE6-IE8 */
                                url('../fonts/raleway-v19-latin-800.woff2') format('woff2'),
                                /* Super Modern Browsers */
                                url('../fonts/raleway-v19-latin-800.woff') format('woff'),
                                /* Modern Browsers */
                                url('../fonts/raleway-v19-latin-800.ttf') format('truetype'),
                                /* Safari, Android, iOS */
                                url('../fonts/raleway-v19-latin-800.svg#Raleway') format('svg');
                            /* Legacy iOS */
                        }
                    
                        body {
                            background-color: #242529;
                            color: #dcddde;
                            font-family: "Raleway", sans-serif;
                            font-size: 16px;
                            font-weight: 800;
                            margin: 0;
                            padding: 0;
                            background-image: url("https://cdn.discordapp.com/attachments/922909468524687370/988474663753633802/Nieuw_project_10.png");
                            background-size: cover;
                            background-position: center;
                            background-attachment: fixed;
                        }
                    
                        .flex {
                            display: flex;
                            justify-content: space-between;
                        }
                    
                        .message-container {
                            display: flex;
                            flex-direction: column;
                            padding-left: 15px;
                        }
                    
                        .copyright {
                            position: fixed;
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            background-color: red;
                            color: white;
                            text-align: center;
                        }
                    
                        .parent-container {
                            padding: 25px;
                            display: flex;
                            margin: 20px;
                            background-color: #242529;
                            border-radius: 20px;
                        }
                    
                        .avatar {
                            border-radius: 50%;
                            height: 50px;
                            width: 50px;
                        }
                    
                        .message-container .span_name{
                            color: #5865F2;
                        }
                    
                        .info__guild-name {
                            font-size: 1.4em;
                        }
                    
                        .info {
                            display: flex;
                            justify-content: space-between;
                            max-width: 100%;
                            padding: 10px;
                            margin: 20px;
                            background-color: #242529;
                            border-radius: 20px;
                            width: 50%;
                        }
                    
                        .info__channel-name {
                            font-size: 1.2em;
                        }
                    
                        .info__guild-icon {
                            max-width: 88px;
                            max-height: 88px;
                        }
                    
                        .info__metadata {
                            flex: 1;
                            margin-left: 50px;
                            justify-self: center;
                            align-self: center;
                        }
                    
                        .info__guild-icon-container {
                            flex: 0;
                        }
                    </style><div class="flex"><div class="info"><div class="info__guild-icon-container"><img src="https://cdn.discordapp.com/attachments/922909468524687370/988473882694537226/trappingpng.png" width="150"></div><div class="info__metadata"><div class="info__guild-name">${inter.guild.name}</div><div class="info__channel-name">Eigenaar Ticket: ${inter.user.username}</div><div class="info__channel-message-count">${date.toLocaleString()}</div></div></div><div class="info"><div class="info__metadata"><div class="info__guild-name">${inter.guild.name} 2022 </div></div></div></div><div class="parent-container"><div class="avatar-container"><img src="https://cdn.discordapp.com/attachments/922909468524687370/988473882694537226/trappingpng.png" class="avatar"></div><div class="message-container"><span class="span_name">${client.user.username} ${date.toLocaleString()}</span><span>Beste ${inter.user}, Bedankt voor het openen van een Unban Aanvraag Ticket.\nHet Staff Team van Trappin zal u zo snel mogelijk helpen! \n </span></div></div></div></div><span></span></div></div>
                  
                `, function (err) {
                    if (err) throw err;
                });
        
        
                
                const button = new Discord.MessageActionRow()
                .addComponents(
                 new Discord.MessageButton()
                .setCustomId('close')
                .setLabel('🗑️')
                .setStyle('SECONDARY')
                )
                
                
                
                
                const thanksEmbed = new Discord.MessageEmbed()
            .setColor(client.config.color)
            .setAuthor(`Bugg Ticket`, inter.guild.iconURL())
            .setDescription(`Welcome to your ticket, our support team is ready to help you!
            Explain your problem in advance so that we can help you as soon as possible!
            
            **Available Ticket Commands!** :arrow_heading_down:
                    > \`/add\` - Add a user to this ticket
                    > \`/remove\` - Remove a user from this ticket
                    > \`/rename\` - Rename the ticket channel
                    > \`/close\` - Delete a ticket channel
            
            You can execute these commands via our slash commands.

		*Met vriendelijke groeten,*
		*Ryvo | WHMCS Staff Team*
        `)  
            .setFooter('© Ryvo | WHMCS', 'https://cdn.discordapp.com/attachments/998007503386333254/999229981517426729/34515332-6CDC-45A0-9D07-855237DF7503__1_-removebg-preview.png')
                    c.send({ content: `${inter.user} Welkom in je ticket! :wave:`, embeds: [thanksEmbed], components: [button] })
        
                    db.set(`ticketApproved_${c.id}`, true)
                    db.set(`ticket_${inter.user.id}`, true)
        
            });
        }
        }

		
        // Development Event
        if(inter.isSelectMenu()){

            if (inter.values[0] === 'development') {
    

            if(db.get(`ticket_${inter.user.id}`) === true){
                const alreadyOpen = new Discord.MessageEmbed()
                    .setDescription(`Je hebt momenteel al een ticket open!\nSluit deze eerst voordat je een nieuwe opent!`)
                    .setColor(client.config.color)
                return await inter.reply({ embeds: [alreadyOpen], ephemeral: true })
            }
        
            const everyoneRole = inter.guild.roles.cache.find(x => x.name === "@everyone").id;
            inter.guild.channels.create(`development-${inter.user.username}`, { type: 'text', permissionOverwrites: [
                {
                    id: everyoneRole,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                },
                {
                    id: inter.user.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                },
                {
                    id: client.config.staff,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                }
            ], topic: inter.user.id, parent: client.config.developmentticket}).then(async c => {
        
                await inter.reply({content: `Je ticket is aangemaakt, bekijk je ticket in ${c}`, ephemeral: true})
                const date = new Date();
                fs.appendFile(`./transcripts/transcript-${c.id}.html`,  `  <!--Goeiedag lezer!>
                Om dit ticket transcript duidelijk te lezen dien je hem te downloaden en te openenen naar je browser
                ----------------------------------------- -->
                
                <style>
                        /* raleway-800 - latin */
                        @font-face {
                            font-family: 'Raleway';
                            font-style: normal;
                            font-weight: 800;
                            src: url('../fonts/raleway-v19-latin-800.eot');
                            /* IE9 Compat Modes */
                            src: local(''),
                                url('../fonts/raleway-v19-latin-800.eot?#iefix') format('embedded-opentype'),
                                /* IE6-IE8 */
                                url('../fonts/raleway-v19-latin-800.woff2') format('woff2'),
                                /* Super Modern Browsers */
                                url('../fonts/raleway-v19-latin-800.woff') format('woff'),
                                /* Modern Browsers */
                                url('../fonts/raleway-v19-latin-800.ttf') format('truetype'),
                                /* Safari, Android, iOS */
                                url('../fonts/raleway-v19-latin-800.svg#Raleway') format('svg');
                            /* Legacy iOS */
                        }
                    
                        body {
                            background-color: #242529;
                            color: #dcddde;
                            font-family: "Raleway", sans-serif;
                            font-size: 16px;
                            font-weight: 800;
                            margin: 0;
                            padding: 0;
                            background-image: url("https://cdn.discordapp.com/attachments/922909468524687370/988474663753633802/Nieuw_project_10.png");
                            background-size: cover;
                            background-position: center;
                            background-attachment: fixed;
                        }
                    
                        .flex {
                            display: flex;
                            justify-content: space-between;
                        }
                    
                        .message-container {
                            display: flex;
                            flex-direction: column;
                            padding-left: 15px;
                        }
                    
                        .copyright {
                            position: fixed;
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            background-color: red;
                            color: white;
                            text-align: center;
                        }
                    
                        .parent-container {
                            padding: 25px;
                            display: flex;
                            margin: 20px;
                            background-color: #242529;
                            border-radius: 20px;
                        }
                    
                        .avatar {
                            border-radius: 50%;
                            height: 50px;
                            width: 50px;
                        }
                    
                        .message-container .span_name{
                            color: #5865F2;
                        }
                    
                        .info__guild-name {
                            font-size: 1.4em;
                        }
                    
                        .info {
                            display: flex;
                            justify-content: space-between;
                            max-width: 100%;
                            padding: 10px;
                            margin: 20px;
                            background-color: #242529;
                            border-radius: 20px;
                            width: 50%;
                        }
                    
                        .info__channel-name {
                            font-size: 1.2em;
                        }
                    
                        .info__guild-icon {
                            max-width: 88px;
                            max-height: 88px;
                        }
                    
                        .info__metadata {
                            flex: 1;
                            margin-left: 50px;
                            justify-self: center;
                            align-self: center;
                        }
                    
                        .info__guild-icon-container {
                            flex: 0;
                        }
                    </style><div class="flex"><div class="info"><div class="info__guild-icon-container"><img src="https://cdn.discordapp.com/attachments/998007503386333254/999229981517426729/34515332-6CDC-45A0-9D07-855237DF7503__1_-removebg-preview.png" width="150"></div><div class="info__metadata"><div class="info__guild-name">${inter.guild.name}</div><div class="info__channel-name">Eigenaar Ticket: ${inter.user.username}</div><div class="info__channel-message-count">${date.toLocaleString()}</div></div></div><div class="info"><div class="info__metadata"><div class="info__guild-name">${inter.guild.name} 2022 </div></div></div></div><div class="parent-container"><div class="avatar-container"><img src="https://cdn.discordapp.com/attachments/922909468524687370/988473882694537226/trappingpng.png" class="avatar"></div><div class="message-container"><span class="span_name">${client.user.username} ${date.toLocaleString()}</span><span>Beste ${inter.user}, Bedankt voor het openen van een Donatie Ticket\nHet staff team van **${inter.guild.name}** zal  u zo snel mogelijk helpen!
                    </span></div></div></div></div><span></span></div></div>`, function (err) {
                    if (err) throw err;
                });
        


                const button = new Discord.MessageActionRow()
                .addComponents(
                 new Discord.MessageButton()
                .setCustomId('close')
                .setLabel('🗑️')
                .setStyle('SECONDARY')
                )
        
        
                const thanksEmbed = new Discord.MessageEmbed()
            .setColor(client.config.color)
            .setAuthor(`Development Ticket`, inter.guild.iconURL())
            .setDescription(`Welcome to your ticket, our support team is ready to help you!
            Explain your problem in advance so that we can help you as soon as possible!
            
            **Available Ticket Commands!** :arrow_heading_down:
                    > \`/add\` - Add a user to this ticket
                    > \`/remove\` - Remove a user from this ticket
                    > \`/rename\` - Rename the ticket channel
                    > \`/close\` - Delete a ticket channel
            
            You can execute these commands via our slash commands.
            
            *Kind regards,*
		*Ryvo | WHMCS Staff Team*
        `)  
            .setFooter('© Ryvo | WHMCS', 'https://cdn.discordapp.com/attachments/998007503386333254/999229981517426729/34515332-6CDC-45A0-9D07-855237DF7503__1_-removebg-preview.png')
                    c.send({ content: `${inter.user} Welkom in je ticket! :wave:`, embeds: [thanksEmbed], components: [button] })
                   
        
                    db.set(`ticketApproved_${c.id}`, true)
                    db.set(`ticket_${inter.user.id}`, true)
        
            });
        
        }
    }
    // Onderwereld Event
    if(inter.isSelectMenu()){

        if (inter.values[0] === 'onderwereld') {


        if(db.get(`ticket_${inter.user.id}`) === true){
            const alreadyOpen = new Discord.MessageEmbed()
                .setDescription(`Je hebt momenteel al een ticket open!\nSluit deze eerst voordat je een nieuwe opent!`)
                .setColor(client.config.color)
            return await inter.reply({ embeds: [alreadyOpen], ephemeral: true })
        }
    
        const everyoneRole = inter.guild.roles.cache.find(x => x.name === "@everyone").id;
        inter.guild.channels.create(`onderwereld-${inter.user.username}`, { type: 'text', permissionOverwrites: [
            {
                id: everyoneRole,
                deny: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
            },
            {
                id: inter.user.id,
                allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
            },
            {
                id: client.config.staff,
                allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
            }
        ], topic: inter.user.id, parent: client.config.onderwereldticket}).then(async c => {
    
            await inter.reply({content: `Je ticket is aangemaakt, bekijk je ticket in ${c}`, ephemeral: true})
            const date = new Date();
            fs.appendFile(`./transcripts/transcript-${c.id}.html`,  `  <!--Goeiedag lezer!>
            Om dit ticket transcript duidelijk te lezen dien je hem te downloaden en te openenen naar je browser
            ----------------------------------------- -->
            
            <style>
                    /* raleway-800 - latin */
                    @font-face {
                        font-family: 'Raleway';
                        font-style: normal;
                        font-weight: 800;
                        src: url('../fonts/raleway-v19-latin-800.eot');
                        /* IE9 Compat Modes */
                        src: local(''),
                            url('../fonts/raleway-v19-latin-800.eot?#iefix') format('embedded-opentype'),
                            /* IE6-IE8 */
                            url('../fonts/raleway-v19-latin-800.woff2') format('woff2'),
                            /* Super Modern Browsers */
                            url('../fonts/raleway-v19-latin-800.woff') format('woff'),
                            /* Modern Browsers */
                            url('../fonts/raleway-v19-latin-800.ttf') format('truetype'),
                            /* Safari, Android, iOS */
                            url('../fonts/raleway-v19-latin-800.svg#Raleway') format('svg');
                        /* Legacy iOS */
                    }
                
                    body {
                        background-color: #242529;
                        color: #dcddde;
                        font-family: "Raleway", sans-serif;
                        font-size: 16px;
                        font-weight: 800;
                        margin: 0;
                        padding: 0;
                        background-image: url("https://cdn.discordapp.com/attachments/922909468524687370/988474663753633802/Nieuw_project_10.png");
                        background-size: cover;
                        background-position: center;
                        background-attachment: fixed;
                    }
                
                    .flex {
                        display: flex;
                        justify-content: space-between;
                    }
                
                    .message-container {
                        display: flex;
                        flex-direction: column;
                        padding-left: 15px;
                    }
                
                    .copyright {
                        position: fixed;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        background-color: red;
                        color: white;
                        text-align: center;
                    }
                
                    .parent-container {
                        padding: 25px;
                        display: flex;
                        margin: 20px;
                        background-color: #242529;
                        border-radius: 20px;
                    }
                
                    .avatar {
                        border-radius: 50%;
                        height: 50px;
                        width: 50px;
                    }
                
                    .message-container .span_name{
                        color: #5865F2;
                    }
                
                    .info__guild-name {
                        font-size: 1.4em;
                    }
                
                    .info {
                        display: flex;
                        justify-content: space-between;
                        max-width: 100%;
                        padding: 10px;
                        margin: 20px;
                        background-color: #242529;
                        border-radius: 20px;
                        width: 50%;
                    }
                
                    .info__channel-name {
                        font-size: 1.2em;
                    }
                
                    .info__guild-icon {
                        max-width: 88px;
                        max-height: 88px;
                    }
                
                    .info__metadata {
                        flex: 1;
                        margin-left: 50px;
                        justify-self: center;
                        align-self: center;
                    }
                
                    .info__guild-icon-container {
                        flex: 0;
                    }
                </style><div class="flex"><div class="info"><div class="info__guild-icon-container"><img src="https://cdn.discordapp.com/attachments/922909468524687370/988473882694537226/trappingpng.png" width="150"></div><div class="info__metadata"><div class="info__guild-name">${inter.guild.name}</div><div class="info__channel-name">Eigenaar Ticket: ${inter.user.username}</div><div class="info__channel-message-count">${date.toLocaleString()}</div></div></div><div class="info"><div class="info__metadata"><div class="info__guild-name">${inter.guild.name} 2022 </div></div></div></div><div class="parent-container"><div class="avatar-container"><img src="https://cdn.discordapp.com/attachments/922909468524687370/988473882694537226/trappingpng.png" class="avatar"></div><div class="message-container"><span class="span_name">${client.user.username} ${date.toLocaleString()}</span><span>Beste ${inter.user}, Bedankt voor het openen van een Donatie Ticket\nHet staff team van **${inter.guild.name}** zal  u zo snel mogelijk helpen!
                </span></div></div></div></div><span></span></div></div>`, function (err) {
                if (err) throw err;
            });
    


            const button = new Discord.MessageActionRow()
            .addComponents(
             new Discord.MessageButton()
            .setCustomId('close')
            .setLabel('🗑️')
            .setStyle('SECONDARY')
            )
    
    
            const thanksEmbed = new Discord.MessageEmbed()
            .setColor(client.config.color)
            .setAuthor(`Onderwereld Ticket`, inter.guild.iconURL())
            .setDescription(`Welkom in je ticket, ons support team staat klaar om je te helpen!
		Leg alvast je probleem uit zodat wij jou zo snel mogelijk kunnen helpen!

		**Beschikbare Ticket Commands!** :arrow_heading_down:
        > \`/add\` - Voeg een gebruiker toe aan deze ticket
        > \`/remove\` - Verwijder een gebruiker uit deze ticket
        > \`/rename\` - Hernoem het ticket kanaal
        > \`/close\` - Verwijder een ticket kanaal

		Deze commands kun je uitvoeren via onze slash commands.

		*Met vriendelijke groeten,*
		*Trappin Staff Team*
        `)  
            .setFooter('© Trappin', 'https://cdn.discordapp.com/attachments/922909468524687370/988483874923360256/trappin1frame.png.png')
                c.send({ content: `${inter.user} Welkom in je ticket! :wave:`, embeds: [thanksEmbed], components: [button] })
               
    
                db.set(`ticketApproved_${c.id}`, true)
                db.set(`ticket_${inter.user.id}`, true)
    
        });
    
    }
}
// Donatie Event
if(inter.isSelectMenu()){

    if (inter.values[0] === 'donatie') {


    if(db.get(`ticket_${inter.user.id}`) === true){
        const alreadyOpen = new Discord.MessageEmbed()
            .setDescription(`Je hebt momenteel al een ticket open!\nSluit deze eerst voordat je een nieuwe opent!`)
            .setColor(client.config.color)
        return await inter.reply({ embeds: [alreadyOpen], ephemeral: true })
    }

    const everyoneRole = inter.guild.roles.cache.find(x => x.name === "@everyone").id;
    inter.guild.channels.create(`donatie-${inter.user.username}`, { type: 'text', permissionOverwrites: [
        {
            id: everyoneRole,
            deny: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
        },
        {
            id: inter.user.id,
            allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
        },
        {
            id: client.config.staff,
            allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
        }
    ], topic: inter.user.id, parent: client.config.donatieticket}).then(async c => {

        await inter.reply({content: `Je ticket is aangemaakt, bekijk je ticket in ${c}`, ephemeral: true})
        const date = new Date();
        fs.appendFile(`./transcripts/transcript-${c.id}.html`,  `  <!--Goeiedag lezer!>
        Om dit ticket transcript duidelijk te lezen dien je hem te downloaden en te openenen naar je browser
        ----------------------------------------- -->
        
        <style>
                /* raleway-800 - latin */
                @font-face {
                    font-family: 'Raleway';
                    font-style: normal;
                    font-weight: 800;
                    src: url('../fonts/raleway-v19-latin-800.eot');
                    /* IE9 Compat Modes */
                    src: local(''),
                        url('../fonts/raleway-v19-latin-800.eot?#iefix') format('embedded-opentype'),
                        /* IE6-IE8 */
                        url('../fonts/raleway-v19-latin-800.woff2') format('woff2'),
                        /* Super Modern Browsers */
                        url('../fonts/raleway-v19-latin-800.woff') format('woff'),
                        /* Modern Browsers */
                        url('../fonts/raleway-v19-latin-800.ttf') format('truetype'),
                        /* Safari, Android, iOS */
                        url('../fonts/raleway-v19-latin-800.svg#Raleway') format('svg');
                    /* Legacy iOS */
                }
            
                body {
                    background-color: #242529;
                    color: #dcddde;
                    font-family: "Raleway", sans-serif;
                    font-size: 16px;
                    font-weight: 800;
                    margin: 0;
                    padding: 0;
                    background-image: url("https://cdn.discordapp.com/attachments/922909468524687370/988474663753633802/Nieuw_project_10.png");
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                }
            
                .flex {
                    display: flex;
                    justify-content: space-between;
                }
            
                .message-container {
                    display: flex;
                    flex-direction: column;
                    padding-left: 15px;
                }
            
                .copyright {
                    position: fixed;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    background-color: red;
                    color: white;
                    text-align: center;
                }
            
                .parent-container {
                    padding: 25px;
                    display: flex;
                    margin: 20px;
                    background-color: #242529;
                    border-radius: 20px;
                }
            
                .avatar {
                    border-radius: 50%;
                    height: 50px;
                    width: 50px;
                }
            
                .message-container .span_name{
                    color: #5865F2;
                }
            
                .info__guild-name {
                    font-size: 1.4em;
                }
            
                .info {
                    display: flex;
                    justify-content: space-between;
                    max-width: 100%;
                    padding: 10px;
                    margin: 20px;
                    background-color: #242529;
                    border-radius: 20px;
                    width: 50%;
                }
            
                .info__channel-name {
                    font-size: 1.2em;
                }
            
                .info__guild-icon {
                    max-width: 88px;
                    max-height: 88px;
                }
            
                .info__metadata {
                    flex: 1;
                    margin-left: 50px;
                    justify-self: center;
                    align-self: center;
                }
            
                .info__guild-icon-container {
                    flex: 0;
                }
            </style><div class="flex"><div class="info"><div class="info__guild-icon-container"><img src="https://cdn.discordapp.com/attachments/922909468524687370/988473882694537226/trappingpng.png" width="150"></div><div class="info__metadata"><div class="info__guild-name">${inter.guild.name}</div><div class="info__channel-name">Eigenaar Ticket: ${inter.user.username}</div><div class="info__channel-message-count">${date.toLocaleString()}</div></div></div><div class="info"><div class="info__metadata"><div class="info__guild-name">${inter.guild.name} 2022 </div></div></div></div><div class="parent-container"><div class="avatar-container"><img src="https://cdn.discordapp.com/attachments/922909468524687370/988473882694537226/trappingpng.png" class="avatar"></div><div class="message-container"><span class="span_name">${client.user.username} ${date.toLocaleString()}</span><span>Hier vind je alle informatie terug vam jou ticket! Heb je verder nog vragen? Dan kan je altijd een nieuwe ticket aanmaken!</span></div></div></div></div><span></span></div></div>`, function (err) {
            if (err) throw err;
        });



        const button = new Discord.MessageActionRow()
        .addComponents(
         new Discord.MessageButton()
        .setCustomId('close')
        .setEmoji('🗑️')
        .setStyle('SECONDARY')
        )


        const thanksEmbed = new Discord.MessageEmbed()
            .setColor(client.config.color)
            .setAuthor(`Donatie Ticket`, inter.guild.iconURL())
            .setDescription(`Welkom in je ticket, ons support team staat klaar om je te helpen!
		Leg alvast je probleem uit zodat wij jou zo snel mogelijk kunnen helpen!

		**Beschikbare Ticket Commands!** :arrow_heading_down:
        > \`/add\` - Voeg een gebruiker toe aan deze ticket
        > \`/remove\` - Verwijder een gebruiker uit deze ticket
        > \`/rename\` - Hernoem het ticket kanaal
        > \`/close\` - Verwijder een ticket kanaal

		Deze commands kun je uitvoeren via onze slash commands.

		*Met vriendelijke groeten,*
		*Trappin Staff Team*
        `)  
            .setFooter('© Trappin', 'https://cdn.discordapp.com/attachments/922909468524687370/988483874923360256/trappin1frame.png.png')
            c.send({ content: `${inter.user} Welkom in je ticket! :wave:`, embeds: [thanksEmbed], components: [button] })
           

            db.set(`ticketApproved_${c.id}`, true)
            db.set(`ticket_${inter.user.id}`, true)

    });

}
}

if(inter.isSelectMenu()){

    if (inter.values[0] === 'vraag') {


    if(db.get(`ticket_${inter.user.id}`) === true){
        const alreadyOpen = new Discord.MessageEmbed()
            .setDescription(`Je hebt momenteel al een ticket open!\nSluit deze eerst voordat je een nieuwe opent!`)
            .setColor(client.config.color)
        return await inter.reply({ embeds: [alreadyOpen], ephemeral: true })
    }

    const everyoneRole = inter.guild.roles.cache.find(x => x.name === "@everyone").id;
    inter.guild.channels.create(`vraag-${inter.user.username}`, { type: 'text', permissionOverwrites: [
        {
            id: everyoneRole,
            deny: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
        },
        {
            id: inter.user.id,
            allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
        },
        {
            id: client.config.staff,
            allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
        }
    ], topic: inter.user.id, parent: client.config.vraagticket}).then(async c => {

        await inter.reply({content: `Je ticket is aangemaakt, bekijk je ticket in ${c}`, ephemeral: true})
        const date = new Date();
        fs.appendFile(`./transcripts/transcript-${c.id}.html`,  `  <!--Goeiedag lezer!>
        Om dit ticket transcript duidelijk te lezen dien je hem te downloaden en te openenen naar je browser
        ----------------------------------------- -->
        
        <style>
                /* raleway-800 - latin */
                @font-face {
                    font-family: 'Raleway';
                    font-style: normal;
                    font-weight: 800;
                    src: url('../fonts/raleway-v19-latin-800.eot');
                    /* IE9 Compat Modes */
                    src: local(''),
                        url('../fonts/raleway-v19-latin-800.eot?#iefix') format('embedded-opentype'),
                        /* IE6-IE8 */
                        url('../fonts/raleway-v19-latin-800.woff2') format('woff2'),
                        /* Super Modern Browsers */
                        url('../fonts/raleway-v19-latin-800.woff') format('woff'),
                        /* Modern Browsers */
                        url('../fonts/raleway-v19-latin-800.ttf') format('truetype'),
                        /* Safari, Android, iOS */
                        url('../fonts/raleway-v19-latin-800.svg#Raleway') format('svg');
                    /* Legacy iOS */
                }
            
                body {
                    background-color: #242529;
                    color: #dcddde;
                    font-family: "Raleway", sans-serif;
                    font-size: 16px;
                    font-weight: 800;
                    margin: 0;
                    padding: 0;
                    background-image: url("https://cdn.discordapp.com/attachments/922909468524687370/988474663753633802/Nieuw_project_10.png");
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                }
            
                .flex {
                    display: flex;
                    justify-content: space-between;
                }
            
                .message-container {
                    display: flex;
                    flex-direction: column;
                    padding-left: 15px;
                }
            
                .copyright {
                    position: fixed;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    background-color: red;
                    color: white;
                    text-align: center;
                }
            
                .parent-container {
                    padding: 25px;
                    display: flex;
                    margin: 20px;
                    background-color: #242529;
                    border-radius: 20px;
                }
            
                .avatar {
                    border-radius: 50%;
                    height: 50px;
                    width: 50px;
                }
            
                .message-container .span_name{
                    color: #5865F2;
                }
            
                .info__guild-name {
                    font-size: 1.4em;
                }
            
                .info {
                    display: flex;
                    justify-content: space-between;
                    max-width: 100%;
                    padding: 10px;
                    margin: 20px;
                    background-color: #242529;
                    border-radius: 20px;
                    width: 50%;
                }
            
                .info__channel-name {
                    font-size: 1.2em;
                }
            
                .info__guild-icon {
                    max-width: 88px;
                    max-height: 88px;
                }
            
                .info__metadata {
                    flex: 1;
                    margin-left: 50px;
                    justify-self: center;
                    align-self: center;
                }
            
                .info__guild-icon-container {
                    flex: 0;
                }
            </style><div class="flex"><div class="info"><div class="info__guild-icon-container"><img src="https://cdn.discordapp.com/attachments/922909468524687370/988473882694537226/trappingpng.png" width="150"></div><div class="info__metadata"><div class="info__guild-name">${inter.guild.name}</div><div class="info__channel-name">Eigenaar Ticket: ${inter.user.username}</div><div class="info__channel-message-count">${date.toLocaleString()}</div></div></div><div class="info"><div class="info__metadata"><div class="info__guild-name">${inter.guild.name} 2022 </div></div></div></div><div class="parent-container"><div class="avatar-container"><img src="https://cdn.discordapp.com/attachments/922909468524687370/988473882694537226/trappingpng.png" class="avatar"></div><div class="message-container"><span class="span_name">${client.user.username} ${date.toLocaleString()}</span><span>Beste ${inter.user}, Bedankt voor het openen van een Donatie Ticket\nHet staff team van **${inter.guild.name}** zal  u zo snel mogelijk helpen!
            </span></div></div></div></div><span></span></div></div>`, function (err) {
            if (err) throw err;
        });



        const button = new Discord.MessageActionRow()
        .addComponents(
         new Discord.MessageButton()
        .setCustomId('close')
        .setEmoji('🗑️')
        .setStyle('SECONDARY')
        )


        const thanksEmbed = new Discord.MessageEmbed()
            .setColor(client.config.color)
            .setAuthor(`Vraag Ticket`, inter.guild.iconURL())
            .setDescription(`Welkom in je ticket, ons support team staat klaar om je te helpen!
		Leg alvast je probleem uit zodat wij jou zo snel mogelijk kunnen helpen!

		**Beschikbare Ticket Commands!** :arrow_heading_down:
        > \`/add\` - Voeg een gebruiker toe aan deze ticket
        > \`/remove\` - Verwijder een gebruiker uit deze ticket
        > \`/rename\` - Hernoem het ticket kanaal
        > \`/close\` - Verwijder een ticket kanaal

		Deze commands kun je uitvoeren via onze slash commands.

		*Met vriendelijke groeten,*
		*Trappin Staff Team*
        `)  
            .setFooter('© Trappin', 'https://cdn.discordapp.com/attachments/922909468524687370/988483874923360256/trappin1frame.png.png')
            c.send({ content: `${inter.user} Welkom in je ticket! :wave:`, embeds: [thanksEmbed], components: [button] })
           

            db.set(`ticketApproved_${c.id}`, true)
            db.set(`ticket_${inter.user.id}`, true)

    });

}
}
        
        
        
        
        //test claim

        if(inter.customId === "claim"){
           if(!inter.member.permissions.has("BAN_MEMBERS")){
        const embed = new Discord.MessageEmbed()
            .setDescription(`Je hebt geen permissies om het ticket te claimen`)
            .setColor(client.config.color)
        return await inter.reply({ embeds: [embed], ephemeral: true  })
    }
           
            if(db.get(`ticketApproved_${inter.channel.id}`) != true){
                const ticketChannel = new Discord.MessageEmbed()
                    .setDescription(`Je kan dit commando enkel in een ticket uitvoeren!\nProbeer het opnieuw in een ticket!`)
                    .setColor(client.config.color)
                return await inter.reply({ embeds: [ticketChannel], ephemeral: true })
                
            }
            const user = client.users.cache.find(x => x.id === inter.channel.topic)
            const test1 = new Discord.MessageEmbed()
                .setDescription(`Je ticket is geclaimed door <@${inter.user.id}>`)
                .setColor(client.config.color)
                .setAuthor(`Ticket Claim`, inter.guild.iconURL())
                .addField(`Ticket van:`, `${user}`, true)
                .setTimestamp()
                .setThumbnail(inter.guild.iconURL())
                await inter.reply({ embeds: [test1] })
            
        
      
          
        
        }
        
    })




    
  




