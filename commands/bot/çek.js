const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MOVE_MEMBERS"))
    return message.reply("<a:warn:826764171261640735> **Bu Komutu Kullanmaya Yetkin Yok!**");

  if (!message.member.voice.channel)
    return message.reply("<a:warn:826764171261640735> **Bir Ses Kanalında Değilsin!**");
  let pixelien = message.mentions.members.first();
  if (!pixelien)
    return message.reply(
      "<a:warn:826764171261640735> **Çekilecek Kişiyi Etiketlemelisin!**"
    );
  if (!pixelien.voice.channel)
    return message.reply("<a:warn:826764171261640735> **Etiketlenen Kişi Bir Sesli Kanalda Değil!**");

  pixelien.voice.setChannel(message.member.voice.channelID);
  message.channel.send("<@"+pixelien + "> **İsimli Kişi Yanına Taşındı!** <a:confirm:816987518665883699>");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: "çek"
};