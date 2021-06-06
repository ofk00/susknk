const Discord = require("discord.js");
 
module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("<a:warn:826764171261640735> Bu komutu kullanabilmek için `Üyeleri Yasakla` yetkisine sahip olmanız gerek.").then(msg => msg.delete({timeout:5000}));
    if (!args[0]) {
        return message.channel.send(`<a:warn:826764171261640735> Bu Komutu Kullanmak İçin Bir Kullanıcının ID'sini Belirtmen Gerek!`).then(msg => msg.delete({timeout:5000}))
   }
   var sebeb = args.slice(1).join(" ");
   var seyfooo = args[0]
   var now = new Date()
   if (!sebeb) {
       message.guild.fetchBans()
           .then(bans => {
               if (bans.has(seyfooo)) {
                   return message.channel.send(`<a:warn:826764171261640735> Bu Kullanıcı Zaten Yasaklanmış.`)
               }
               message.guild.members.ban(seyfooo, sebeb)
                   .then(async (member) => {
                       let user;
                       if (member instanceof Discord.GuildMember) {
                           user = member.user;
                       }
                       else if (member instanceof Discord.User) {
                           user = member;
                       }
                       else {
                           user = await client.users.fetch(member);
                       }
                       message.channel.send(`<@!${user.id}> adlı kullanıcı sunucudan yasaklandı. <a:confirm:816987518665883699>`);
                   })
                   .catch(error => {
                       message.channel.send(`<a:warn:826764171261640735> Bir Hata Oluştu`).then(msg => msg.delete({timeout:5000}));
                       console.error(':x: Hata:', error);
                   });
           });
   } else {
       message.guild.fetchBans()
           .then(bans => {
               if (bans.has(seyfooo)) {
                   return message.channel.send(`<a:warn:826764171261640735> Bu Kullanıcı Zaten Yasaklanmış.`).then(msg => msg.delete({timeout:5000}))
               }
               message.guild.members.ban(seyfooo, sebeb)
                   .then(async (member) => {
                       let user;
                       if (member instanceof Discord.GuildMember) {
                           user = member.user;
                       }
                       else if (member instanceof Discord.User) {
                           user = member;
                       }
                       else {
                           user = await client.users.fetch(member);
                       }
                       message.channel.send(`<@!${user.id}> adlı kullanıcı sunucudan yasaklandı. <a:confirm:816987518665883699>`);
                   })
                   .catch(error => {
                       message.channel.send(`<a:warn:826764171261640735> Bir Hata Oluştu`).then(msg => msg.delete({timeout:5000}));
                       console.error(' Hata:', error);
                   });
           });
   }
 
}
exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['force-ban'],
   permLevel: 0
 
};
 
exports.help = {
   name: 'forceban',
   description: 'id ban',
   usage: 'forceban '
};
