const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const { prefix } = require('../config.json')

module.exports = client => {

console.log("Bot Başlatıldı");

var randomMesajlar = [

    `${client.guilds.cache.size} Sunucu`,
    `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Kullanıcı`,
    `+yardım`,
    `+oynat`
]




setInterval(function() {
    var randomMesajlar1 = randomMesajlar[Math.floor(Math.random() * (randomMesajlar.length))]
    client.user.setActivity(`${randomMesajlar1}`);

}, 2 * 5000);

client.user.setStatus("online");
/*
idle yerine yazılabilecekler

dnd 
idle
online
ofline

*/


}