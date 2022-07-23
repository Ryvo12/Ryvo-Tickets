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
    inter.channel.permissionOverwrites.create(string, { VIEW_CHANNEL: false, SEND_MESSAGES: false})

    const succesEmbed = new Discord.MessageEmbed()
        .setDescription(`${string} was successfully removed from this ticket!`)
        .setColor(client.config.color)
    await inter.reply({ embeds: [ succesEmbed]})

}

module.exports.help = {
    name: 'remove'
}