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

    const name = inter.options.getString('new-name');
    inter.channel.setName(`ticket-${name}`)

    const embed = new Discord.MessageEmbed()
        .setDescription(`This ticket has been successfully renamed to: \`ticket-${name}\``)
        .setColor(client.config.color)
    await inter.reply({ embeds: [embed] })

}

module.exports.help = {
    name: 'rename'
}