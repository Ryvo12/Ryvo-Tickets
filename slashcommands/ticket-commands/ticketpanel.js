const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports.run = async (client, inter, message) => {

    if(!inter.member.permissions.has('ADMINISTRATOR')){
        return inter.reply({ content: 'Jij kan dit commando niet!' })
    }
    const embed5 = new MessageEmbed()
    .setTitle('Geen Geldig Kanaal!')
    .setDescription('Kies Een geldig Kanaal geen catogerie')
    const channel = inter.options.getChannel('kanaal');
    if(channel.type != 'GUILD_TEXT'){return inter.reply({ embeds: [embed5]})}

   
    const embed = new MessageEmbed()
        .setTitle(":tickets: **Denisty | Whmcs tickets**")
        .setDescription(`Dear members of **Denisty | WHMCS**!
        our staff team is ready to help you :person_raising_hand:
        We have created different categories to give you the best support! 🔨

		**Available Categories!** :arrow_heading_down:
        > 💰 - Order
        > 🙋 - Support
        > 🐛 - Bugg report

        Choose the most appropriate category under this message that suits your application.
		*Kind regards,*
		*Denisty | WHMCS Staff Team*
        `)
        .setColor("#7CFC00")
        .setTimestamp()
        .setFooter(client.config.footer)
        const embed1 = new MessageEmbed()
        .setDescription(`> **SUCCESS**: The ticket panel has been successfully sent to the specified channel`)
        .setColor(client.config.color)
        inter.reply({embeds: [embed1], ephemeral: true})

        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('ticketpanel')
                .setPlaceholder('Create A Ticket Here!')
                .addOptions([
                    {
                        emoji: '💰',
                        label: 'ORDER',
                        description: 'Click here to order!',
                        value: 'unban',
                    },
                    {
                        emoji: '🙋',
                        label: 'Support ticket',
                        description: 'Click here for support ticket!',
                        value: 'refund',
                    },
                    {
                        emoji: '🐛',
                        label: 'Bugg Ticket',
                        description: 'Click here if u found a bugg!',
                        value: 'klacht',
                    },
                ]),
        );
    
        
    channel.send({ embeds: [embed], components: [row] })

}

module.exports.help = {
    name: 'ticketpanel'
}