const Discord = require('discord.js');

var prefix = ('+');

exports.run = async (bot, message, args) => {
	
	if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`Bu İşlemi Gerçekleştirmek İçin \`∞ | Rolleri Yönet  | ∞\` Yetkin Olması Gerekli!`).then(msg => msg.delete({timeout:5000}));
  
	const uyari1 = new Discord.MessageEmbed()
   .setDescription(`<a:warn:826764171261640735> | Lütfen rolü vermek istediğin kullanıcıyı etiketle.\nDoğru kullanım: \`+rolver <@kullanıcı> <@verilecek rol>\` `)
   .setColor(message.guild.me.displayColor)
   
     let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
     if (!rMember) return message.channel.send(uyari1).then(msg => msg.delete({timeout:5000}));
   
   const uyari2 = new Discord.MessageEmbed()
   .setDescription(`<a:warn:826764171261640735> | Lütfen vermek istediğin rolü etiketle.\nDoğru kullanım: \`+rolver <@kullanıcı> <@verilecek rol>\` `)
   .setColor(message.guild.me.displayColor)
   
    let role = message.mentions.roles.first()
    if (!role) return message.channel.send(uyari2).then(msg => msg.delete({timeout:5000}));
     const uyari3 = new Discord.MessageEmbed()
   .setDescription(`<a:warn:826764171261640735> | Lütfen geçerli bir rol belirtiniz.\nDoğru kullanım: \`+rolver <@kullanıcı> <@verilecek rol>\` `)
   .setColor(message.guild.me.displayColor)
    let aRole = message.mentions.roles.first()
    if (!aRole) return message.channel.send(uyari3).then(msg => msg.delete({timeout:5000}));
  
    const basarili = new Discord.MessageEmbed()
   .setDescription(`<a:confirm:816987518665883699> | ${rMember} isimli üyeye \`${role.name}\` isimli rol başarı ile verildi.`)
   .setColor(message.guild.me.displayColor)
   .setFooter(`Punisher`)
    message.channel.send(basarili)
    await rMember.roles.add(aRole.id)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['addrole'],
  permLevel: 0
};

exports.help = {
  name: "rolver",
  description: "Kişilere Rol Yetkisi Verir",
  usage: "rolver <mesaj>"
};