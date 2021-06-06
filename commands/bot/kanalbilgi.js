const Discord = require('discord.js');
const Moment = require('moment');

exports.run = function(client, message, args) {
const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
const date = `${Moment(channel.createdAt).format('LL')} | (${Moment(channel.createdAt).fromNow()})`
const type = channel.type
    .replace('text', 'Yazı')
    .replace('voice', 'Ses')
    .replace('category', 'Category')

if (!channel) {
    return message.channel.send('Bir Kanal Belirtiniz!')
}
let i = 0; let izinler = channel.permissionOverwrites.array().length ? channel.permissionOverwrites.array().map((r) => `\`${++i}.\` ${message.guild.roles.cache.get(r.id)}`).join('\n') : 'Bulunmuyor'
const Embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setThumbnail(message.author.avatarURL({dynamic: true}))
    .addField('Kanal Adı', channel.name, true)
    .addField('Kanal ID', channel.id, true)
    .addField('Kanal Türü', type, true)
    .addField('Kanal Kategorisi', channel.parent.name, true)
    .addField('Kanal Pozisyonu', `${channel.position}/${message.guild.channels.cache.size}`, true)
    .addField('Kanal İzinleri', izinler, true)
    .addField('Yavaş Mod', channel.rateLimitPerUser ? channel.rateLimitPerUser : 'Yok', true)
    .addField('NSFW', channel.nsfw ? 'Evet' : 'Hayır', true)
    .addField('Oluşturulma Tarihi', date, true)
    .setFooter(`Punisher  |  ${message.author.tag} Tarafından İstendi`)
    .setTimestamp();

message.channel.send({
    embed: Embed
})
}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['kanalinfo', 'channelinfo', 'kanalbilgi'],
};
    
exports.help = {
name: 'kanalbilgi',
description: 'Belirlenen kanalın bilgisini verir.',
usage: 'kanalbilgi'
};