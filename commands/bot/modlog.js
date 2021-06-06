const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  
if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Bu Komutu Kullanmak İçin **Yönetici** Yetkisine Sahip Olmalısın!");

let logk = message.mentions.channels.first();
let logkanal = await db.fetch(`log_${message.guild.id}`)
  
if (args[0] === "sıfırla" || args[0] === "kapat") {
if(!logkanal) {
  
let modlog1 = new Discord.MessageEmbed()
.setDescription(`Modlog Kanalı Zaten Ayarlanmamış`)
.setFooter('Punisher | Log Sistemi')
.setColor("RED")

return message.channel.send(modlog1)
}
    
db.delete(`log_${message.guild.id}`)
  
let modlog2 = new Discord.MessageEmbed()

.setDescription(`ModLog Kanalı Başarıyla Sıfırlandı`)
.setFooter('Punisher | Log Sistemi')
.setColor("GREEN")

return message.channel.send(modlog2)
}
  
if (!logk) {
  
let modlog3 = new Discord.MessageEmbed()

.setDescription(`Bir Kanal Belirtiniz`)
.setFooter('Punisher | Log Sistemi')
.setColor("RED")

return message.channel.send(modlog3)
}

db.set(`log_${message.guild.id}`, logk.id)

let modlog4 = new Discord.MessageEmbed()

.setDescription(`Mod-Log Kanalı Başarıyla ${logk} Olarak Ayarlandı`)
.setFooter('Punisher | Log Sistemi')
.setColor("GREEN")

message.channel.send(modlog4);

console.log(`${message.guild.name} sunucusunda modlog komutu ${message.author.username} Tarafından kullanıldı`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['mod-log','modlog'],
    permLevel: 0
};

exports.help = {
    name: 'modlog',
    description: 'Mod-Log kanalını belirler.',
    usage: 'modlog <#kanal>'
};