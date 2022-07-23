const Discord = require('discord.js');
const db = require('quick.db');
const client = require("../index").client
const { Permissions } = require('discord.js');
const moment = require('moment');

client.on('channelDelete', async channel => {

    if(db.get(`ticketApproved_${channel.id}`) === true){
        db.delete(`ticketApproved_${channel.id}`)
        db.delete(`ticket_${channel.topic}`)
    }
})