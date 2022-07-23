async function createCmd(client, guildId){
    const data = [

        {
            name: 'new',
            description: 'Maak een ticket aan voor onze Support!',
        },
        {
            name: 'close',
            description: 'Sluit een ticket die open staat.',
        },
        {
            name: 'rename',
            description: 'Geef een ticket een andere naam.',
                options: [
                    {
                        name: 'nieuwe-naam',
                        description: 'Voer de naam in voor het nieuwe ticket!',
                        type: 'STRING',
                        required: true
                    }
                ]
        },
        {
            name: 'add',
            description: 'Voeg een gebruiker of rol toe aan een ticket.',
                options: [
                    {
                        name: 'rol-of-gebruiker',
                        description: 'Vermeld de rol of gebruiker die je wilt toevoegen.',
                        type: 'MENTIONABLE',
                        required: true
                    }
                ]
        },
        {
            name: 'remove',
            description: 'Verwijder een gebruiker of rol uit uit een ticket.',
                options: [
                    {
                        name: 'rol-of-gebruiker',
                        description: 'Vermeld de rol of gebruiker die je wilt verwijderen.',
                        type: 'MENTIONABLE',
                        required: true
                    }
                ]
        },
        {
            name: 'ticketpanel',
            description: 'Plaats het ticket paneel in een kanaal.',
                options: [
                    {
                        name: 'kanaal',
                        description: 'Vermeld het kanaal waar het paneel in moet.',
                        type: 'CHANNEL',
                        required: true
                    }
                ]
        }

    ]

    await client.guilds.cache.get(guildId)?.commands.set(data);

}

module.exports = { createCmd }