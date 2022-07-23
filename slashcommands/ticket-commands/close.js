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

    const succesEmbed = new Discord.MessageEmbed()
        .setDescription(`This ticket has been successfully deleted!\nAnd will be deleted in: \`5\` seconds!`)
        .setColor(client.config.color)
        .setAuthor(`| ${client.user.username} Tickets`, inter.guild.iconURL())
        .addField(`Closed by:`, `${inter.user}`, true)
        .setTimestamp()
        .setThumbnail(inter.guild.iconURL())
    await inter.reply({ embeds: [succesEmbed] })

    const user = client.users.cache.find(x => x.id === inter.channel.topic)
    const logafgeleverd = new Discord.MessageEmbed()
        .setTitle(`Logs-Ticket-Close Command Usage`)
        .setColor(client.config.color)
        .setDescription(`Used by: ${inter.user}\nOwner Ticket : ${user} | ${user.id}\n Channel: ${inter.channel}`)
        .setTimestamp()
        .setFooter('Close Command', client.config.thumbnail)
  const log = inter.guild.channels.cache.find(x => x.id === client.config.logs)
     log.send({embeds: [logafgeleverd]} )

    db.delete(`ticketApproved_${inter.channel.id}`)
    db.delete(`ticket_${inter.channel.topic}`)

    setTimeout(() => {
        inter.channel.delete()
    }, 5000)

}

module.exports.help = {
    name: 'close'
}