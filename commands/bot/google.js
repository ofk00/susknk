
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {



    let google = args.slice(0).join('+');

        let link = `https://www.google.com/search?q=` + google;
        if(!google)return message.reply(`<a:warn:826764171261640735> Aratmak İstediğin Kelimeyi Yazmalısın`).then(msg => msg.delete({timeout:5000}));
        if(!link)return message.reply("<a:warn:826764171261640735> Hata").then(msg => msg.delete({timeout:5000}));
        let embed = new Discord.MessageEmbed()
    
    .setColor("GREEN")
    .addField('Aranıyor:', `${args.slice(0).join(' ')}`)
    .addField("Yazı:", `${args.slice(0).join(' ')}`)
    .addField('Link:', `[Tıkla](${link})`)
    .setFooter("Punisher");
          
    message.channel.send(embed);
  
}



exports.conf =
{
  aliases: []
}

exports.help =
{
  name: "google",
  description: "Google Search.",
  usage: "google"
}