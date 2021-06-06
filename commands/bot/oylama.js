
const Discord = require('discord.js');

 exports.run = (client, message, args) => {
     if(message.channel.type == "dm")  return;
  if(message.channel.type !== "text") return;
   
       if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`).then(msg => msg.delete({timeout:5000}))

   message.delete();

   let question = args.join(' ');

   let user = message.author.username

   if (!question) return message.channel.send(

     new Discord.MessageEmbed()

     .setDescription(`<a:warn:826764171261640735> Oylama Konusunu Yazmalısın`)).then(msg => msg.delete({timeout:5000}))

     message.channel.send(

       new Discord.MessageEmbed()

       .setColor("GREEN")
       .setThumbnail(client.user.avatarURL)
       .setTimestamp()

         .addField(`${client.user.username}`, `**${question}**`)).then(function(message) {

         message.react('👍');

         message.react('👎');

       });

     };

     exports.conf = {
       enabled: true,
       guildOnly: false,
       aliases: ['oylama'],

  permLevel: 1,
           kategori: "Yetkili"

};

exports.help = {
  name: 'oylama',
  description: 'Oylama yapmanızı sağlar.',
  usage: '+oylama <oylamaismi>'
};