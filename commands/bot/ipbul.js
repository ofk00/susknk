const Discord = require('discord.js');
const IPinfo = require('get-ipinfo');
exports.run = async (client, message, args) => {
let kong = args[0] 
if (kong.match(/message.mentions.users.first() || message.author/)) { message.delete(); return message.channel.send('<a:warn:826764171261640735> İp Giriniz.').then(msg => msg.delete({timeout:5000}))}
if(!kong) return message.reply("<a:warn:826764171261640735> İp Giriniz.").then(msg => msg.delete({timeout:5000}))
IPinfo(kong, function(err, ip) {
const embed = new Discord.MessageEmbed()
    .setTitle('İp Bilgileri')
    .addField('Oturduğu Şehir:', ip.city || "bilinmiyor") 
    .addField('İp Numarası:', ip.ip || "bilinmiyor")
    .addField('Host:', ip.hostname || "bilinmiyor")
    .addField('Yer:', ip.region || "bilinmiyor")
    .addField('Kordinat:', ip.loc || "bilinmiyor")
    .addField('Şirket:', ip.org || "bilinmiyor") 
    .addField('Posta Kodu:', ip.postal || "bilinmiyor")
    .setColor('RANDOM'); 
message.channel.send(embed)
          }) 
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ip"],
  permLevel: 0
};

exports.help = {
  name: "ip",
  description: "+ip ip-numarası",
  usage: "ipbilgi"
};