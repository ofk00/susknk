const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
    let youtube = args.slice(0).join('+');
        let link = `https://www.youtube.com/results?search_query=` + youtube;
        if(!youtube)return message.reply(`<a:warn:826764171261640735> Aratmak İstediğin Kelimeyi Yazmalısın`).then(msg => msg.delete({timeout:5000}));
        if(!link)return message.reply("<a:warn:826764171261640735> Hata").then(msg => msg.delete({timeout:5000}));
        let embed = new Discord.MessageEmbed()   
          .setColor("RED")
          .addField('Aktivasyon:', 'Youtubede Aranıyor')
          .addField("Aranan:", `${args.slice(0).join(' ')}`)
          .addField('Link:', `[Tıkla](${link})`)
          .setFooter("Punisher");
          message.channel.send(embed);
        
    
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['youtube'],
  permLevel: 0
};
exports.help = {
  name: 'youtube',
  description: 'Denemde...',
  usage: 'youtube'
};