const Discord = require('discord.js');
const db = require('quick.db');
const { Permissions } = require('discord.js');

module.exports.run = async (client, inter) => {


    if(db.get(`ticketApproved_${inter.channel.id}`) != true){
        const ticketChannel = new Discord.MessageEmbed()
            .setDescription(`You can only run this command in a ticket!\nTry again in a ticket!`)
            .setColor(client.config.color)
        return await inter.reply({ embeds: [ticketChannel], ephemeral: true })
    }

    const string = inter.options.getMentionable('role-or-user');
   
    inter.channel.permissionOverwrites.create(string, { VIEW_CHANNEL: true, SEND_MESSAGES: true})

    const succesEmbed = new Discord.MessageEmbed()
        .setDescription(`${string} has been successfully added to this ticket!`)
        .setColor(client.config.color)
    await inter.reply({ embeds: [ succesEmbed]})


const logafgeleverd = new Discord.MessageEmbed()
        .setTitle(`Logs-Add Command Usage`)
        .setColor(client.config.color)
        .setDescription(`Used by: ${inter.user}\n Added person ${string} |\`${string}\`\n Channel: ${inter.channel}`)
        .setTimestamp()
        .setFooter('Add Command', client.config.thumbnail)
  const log = inter.guild.channels.cache.find(x => x.id === client.config.logs)
     log.send({embeds: [logafgeleverd]} )
}

module.exports.help = {
    name: 'add'
}