const Discord = require("discord.js");
const superagent = require("superagent");
const database = require('quick.db');
const Moment = require('moment');
const permler = {
  "ADMINISTRATOR": "Yönetici",
  "CREATE_INSTANT_INVITE": "Davet Oluştur",
  "KICK_MEMBERS": "Üyeleri At",
  "BAN_MEMBERS": "Üyeleri Yasakla",
  "MANAGE_CHANNELS": "Kanalları Yönet",
  "MANAGE_GUILD": "Sunucuyu Yönet",
  "ADD_REACTIONS": "Tepki Ekle",
  "VIEW_AUDIT_LOG": "Denetim Kaydını Görüntüle",
  "PRIORITY_SPEAKER": "Öncelikli Konuşmacı",
  "STREAM": "Yayın Aç",
  "VIEW_CHANNEL": "Kanalları Gör",
  "SEND_MESSAGES": "Mesaj Gönder",
  "SEND_TTS_MESSAGES": "Metin Okuma Mesajı Gönder",
  "MANAGE_MESSAGES": "Mesajları Yönet",
  "EMBED_LINKS": "Bağlantı Yerleştir",
  "ATTACH_FILES": "Dosya Ekle",
  "READ_MESSAGE_HISTORY": "Mesaj Geçmişini Oku",
  "MENTION_EVERYONE": "@everyone, @here ve Tüm Rollerden Bahset",
  "USE_EXTERNAL_EMOJIS": "Harici Emojiler Kullan",
  "VIEW_GUILD_INSIGHTS": "Sunucu Bilgilerini Görüntüle",
  "CONNECT": "Bağlan",
  "SPEAK": "Konuş",
  "MUTE_MEMBERS": "Üyeleri Sustur",
  "DEAFEN_MEMBERS": "Üyeleri Sağırlaştır",
  "MOVE_MEMBERS": "Üyeleri Taşı",
  "USE_VAD": "Ses Eylemini Kullan",
  "CHANGE_NICKNAME": "Kullanıcı Adı Değiştir",
  "MANAGE_NICKNAMES": "Kullanıcı Adlarını Yönet",
  "MANAGE_ROLES": "Rolleri Yönet",
  "MANAGE_WEBHOOKS": "Webhook'ları Yönet",
  "MANAGE_EMOJIS": "Emojileri Yönet"
};

module.exports.run = async (client,message,args) => {
 
  let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(rol => rol.id === args[0]);

  let punisherprefix = ('+');
let prefix = await database.fetch(`prefixes.${message.guild.id}`) || punisherprefix
  
let asıl = message.guild.roles.cache.get(role.id || role)
let izinler = asıl.permissions.toArray().slice(0, 8).map((r, index) => `\`${index + 1}.\` ${permler[r]}`).join('\n')
let izinler2 = asıl.permissions.toArray().map((r, index) => `\`${index + 1}.\` ${permler[r]}`).join('\n')
let izin = asıl.permissions.toArray().includes('ADMINISTRATOR') ? `:star: Yönetici :star:\n╰> Yönetici yetkisi olduğu için diğer ${asıl.permissions.toArray().length - 1} yetki sıralanmadı.` : asıl.permissions.toArray().length > 9 ? izinler + `\n╰> ${asıl.permissions.toArray().length - 8} Adet fazladan yetki bulunmaktadır.` : izinler2
let rolüyeler = asıl.members.size < 9 ? asıl.members.array().map((r, index) => `\`${index + 1}.\` ${r}`).join('\n') : asıl.members.array().slice(0, 8).map((r, index) => `\`${index + 1}.\` ${r}`).join('\n') + `\n╰> ${asıl.members.size - 8} Kişide daha bulunmaktadır.`
  var wasait = new Discord.MessageEmbed()
  
  .setColor("RED")
  .setDescription(`Hey, bir rol etiketlemelisin! Örneğin: ${prefix}**rol-bilgi <@rol>**`);
  
  if(!role) return message.channel.send(wasait);
  
  var moment = require("moment");
  var temps = moment(message.createdTimestamp).format("LLLL");
  
  var wasaitEmbed = new Discord.MessageEmbed()
  
  .setColor('YELLOW')
  .addField('Rol Adı', role.name, true)
  .addField('İd', role.id, true)
  .addField('Renk', role.hexColor, true)
  .addField('Etiketlenebilir', role.mentionable ? '\nEvet' : 'Hayır', true)
  .addField('Sıralaması', `${asıl.rawPosition ? asıl.rawPosition : '1'}/${message.guild ? message.guild.roles.cache.size : '1'}`)
  .addField('Oluşturulma Tarihi', `${Moment(role.createdAt).format('LL')} | (${Moment(role.createdAt).fromNow()})`, true)
  .addField(`Rol Yetkileri (${asıl.permissions.toArray().length})`, `${!izin ? 'Bulunamadı.' : izin}`)
  .addField(`Role Sahip Kullanıcılar (${asıl.members.size})`, `${!rolüyeler ? 'Bu role sahip kimse bulunmuyor.' : rolüyeler}`)
  .setFooter(`Punisher  |  ${message.author.tag} Tarafından İstendi`, message.author.avatarURL({ dynamic: true }))
  .setTimestamp();
  
  message.channel.send(wasaitEmbed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['rol-bilgi', 'rolbilgi', 'roleinfo', 'rolinfo'],
  permLevel: 0
};

exports.help = {
  name: 'rolbilgi',
  description: 'Etiketlediğin rolün bilgilerini verir.',
  usage: 'rolbilgi'
};