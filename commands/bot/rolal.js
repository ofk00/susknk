const Discord = require('discord.js');

var prefix = ('+');

exports.run = async (bot, message, args) => {
	
	if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`Bu İşlemi Gerçekleştirmek İçin \`∞ | Rolleri Yönet  | ∞\` Yetkin Olması Gerekli!`).then(msg => msg.delete({timeout:5000}));
  
	const uyari1 = new Discord.MessageEmbed()
   .setDescription(`<a:warn:826764171261640735> | Lütfen rol almak istediğin kullanıcıyı etiketle.\nDoğru kullanım: \`+rolal <@kullanıcı> <@alınacak rol>\` `)
   .setColor(message.guild.me.displayColor)
   
     let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
     if (!rMember) return message.channel.send(uyari1).then(msg => msg.delete({timeout:5000}));
   
   const uyari2 = new Discord.MessageEmbed()
   .setDescription(`<a:warn:826764171261640735> | Lütfen almak istediğin rolü etiketle.\nDoğru kullanım: \`+rolal <@kullanıcı> <@alınacak rol>\` `)
   .setColor(message.guild.me.displayColor)
   
    let role = message.mentions.roles.first()
    if (!role) return message.channel.send(uyari2).then(msg => msg.delete({timeout:5000}));

     const uyari3 = new Discord.MessageEmbed()
   .setDescription(`<a:warn:826764171261640735> | Lütfen geçerli bir rol belirtiniz.\nDoğru kullanım: \`+rolal <@kullanıcı> <@alınacak rol>\` `)
   .setColor(message.guild.me.displayColor)
    let rRole = message.mentions.roles.first()
    if (!rRole) return message.channel.send(uyari3).then(msg => msg.delete({timeout:5000}));
  
    const basarili = new Discord.MessageEmbed()
   .setDescription(`<a:confirm:816987518665883699> | ${rMember} isimli üyeden \`${role.name}\` isimli rol başarı ile alındı.`)
   .setColor(message.guild.me.displayColor)
   .setFooter(`Punisher`)
    message.channel.send(basarili)
    await rMember.roles.remove(rRole.id)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['removerole'],
  permLevel: 0
};

exports.help = {
  name: "rolal",
  description: "Kişilere Rol Yetkisi Verir",
  usage: "rolal <mesaj>"
};