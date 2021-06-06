const Discord = require("discord.js");
 
exports.run = function(client, message, args) {
  var öneri = args.slice(0).join(" ");
 
  var guildID = "796794738879496213";
 
  var channelID = "826745476530962432"; 
 
  if (!öneri) {
    return message.reply(
      "İsteğini Belirtmelisin! Örnek Kullanım: **+istek**"
    );
  } else {
    var embed = new Discord.MessageEmbed()
 
      .setTimestamp()
 
      .setColor("GREEN")
 
      .setAuthor("Yeni İstek")
 
      .addField("User:", message.author.tag)
 
      .addField("ID", message.author.id)
 
      .addField("Suggestion", öneri)

      .setImage("https://images-ext-1.discordapp.net/external/Bb032GyJs8yCJiUy7tWQ-YnNRPreLuPDo-xp66eOIeU/https/images-ext-2.discordapp.net/external/H1PQhcDr-EaEvwENT8cUxj8S2yonFZl351YbXXH5sGs/https/media.discordapp.net/attachments/697145772801785876/716671769355747348/1.gif")
 
      client.guilds
      .cache.get(guildID)
      .channels.cache.get(channelID)
      .send(embed);
 
    message.channel.send("İsteğiniz Alındı! Teşekkürler...");
  }
};
 
exports.conf = {
  enabled: true,
 
  guildOnly: false,
 
  aliases: ["istek"],
 
  permLevel: 0
};
 
exports.help = {
  name: "istek",
 
  description: "Bot hakkındaki önerilerinizi bot sahibine ulaştırır.",
 
  usage: "istek"
};
 
