const Discord = require('discord.js');
exports.run = function(client, message, args) {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("<a:warn:826764171261640735> Bu Komutu Kullanmak İçin İzniniz Yok!").then(msg => msg.delete({timeout:5000}))
if(!args[0]) return message.channel.send("<a:warn:826764171261640735> Lütfen Silinicek Mesaj Miktarını Yazın, 14 Günden Eski Mesajlar Silinemez:").then(msg => msg.delete({timeout:5000}))
message.channel.bulkDelete(args[0]).then(() => {
message.channel.send(`${message.member}, ${args[0]} Adet Mesaj Başarıyla Silindi. <a:confirm:816987518665883699>`).then(msg => msg.delete({timeout:5000}))
})
}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['sil'],
};

exports.help = {
name: 'sil',
description: 'Belirlenen miktarda mesajı siler.',
usage: 'sil'
};