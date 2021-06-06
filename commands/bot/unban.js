const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new MessageEmbed().setDescription(`<a:warn:826764171261640735> Bu komutu kullanabilmek için Üyeleri Yasakla yetkisine sahip olmanız gerek.`)).then(msg => msg.delete({timeout:5000}));
    let user = args[0];
    const banList = await message.guild.fetchBans();
    if (!user || isNaN(user) || !banList.has(user)) {
        return message.channel.send(new MessageEmbed().setDescription(`<a:warn:826764171261640735> Bu İD Hatalı Veya Yasaklı Değil.`)).then(msg => msg.delete({timeout:5000}));
    }
    message.guild.members.unban(user);
    message.channel.send(new MessageEmbed().setDescription(`<a:confirm:816987518665883699> <@!${user}> Kullanıcısının Yasaklaması Başarıyla Kaldırıldı.`))
};

exports.conf = {
    aliases: ["unban"]
};

exports.help = {
    name: 'unban'
};