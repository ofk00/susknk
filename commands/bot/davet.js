
const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
   const invite = new Discord.MessageEmbed()
  .setColor('GRAY')
  .setFooter('Punisher', bot.user.avatarURL)
  .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
  .addField("**» Bot Davet**", " [Tıkla](https://top.gg/bot/657944543219679255/invite)", )
  .addField("**» Destek Sunucusu**", " [Tıkla](https://discord.gg/SPjDK7pCC5)", )
 return message.channel.send(invite);
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [ 'davet', 'invite'],
  permLevel: 0
};

exports.help = {
  name: "davet",
  description: "Bot davet",
  usage: "davet"
};