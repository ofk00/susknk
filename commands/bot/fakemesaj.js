const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  
  if (message.deletable) await message.delete();
  if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return message.channel.send(`${message.author} \`Webhookları Yönet\` iznim yok.`).then(a => a.delete({timeout: 10000}));
  
  let ÇekilecekKullanıcı = args[0];
  if (!ÇekilecekKullanıcı) return message.channel.send(`${message.author} Bir kullanıcı ID'si girmelisin.`).then(a => a.delete({timeout: 10000}));
  if(!Number(ÇekilecekKullanıcı)) return message.channel.send(`${message.author} Kullanıcı ID'leri rakam ile yazılmalı.`).then(a => a.delete({timeout: 10000}));

  let YazılacakMesaj = args.slice(1).join(' ');
  if (!YazılacakMesaj) return message.channel.send(`${message.author} ID'sini girdiğin kullanıcı ne yazsın?`).then(a => a.delete({timeout: 10000}));
  
  if (YazılacakMesaj.includes("@everyone")) return message.channel.send(`${message.author} Everyone mu? Hayır Bunu Yapmana İzin Vermem.`).then(a => a.delete({timeout: 60000}));
  if (YazılacakMesaj.includes("@here")) return message.channel.send(`${message.author} Here mi? Hayır Bunu Yapmana İzin Vermem.`).then(a => a.delete({timeout: 60000}));
  if (YazılacakMesaj.includes(".gg")) return message.channel.send(`${message.author} Reklam mı? Hayır Bunu Yapmana İzin Vermem.`).then(a => a.delete({timeout: 60000}));
  if (YazılacakMesaj.includes("discord.gg")) return message.channel.send(`${message.author} Reklam mı? Hayır Bunu Yapmana İzin Vermem.`).then(a => a.delete({timeout: 60000}));
  if (YazılacakMesaj.includes(".com")) return message.channel.send(`${message.author} Reklam mı? Hayır Bunu Yapmana İzin Vermem.`).then(a => a.delete({timeout: 60000}));
  if (YazılacakMesaj.includes(".net")) return message.channel.send(`${message.author} Reklam mı? Hayır Bunu Yapmana İzin Vermem.`).then(a => a.delete({timeout: 60000}));
  
  let Kullanıcı = await client.users.fetch(ÇekilecekKullanıcı);
  try { 
  message.channel.createWebhook(Kullanıcı.username, {
      avatar: Kullanıcı.avatarURL()}) 
    .then(async (wb) => {
        const Webhook = new Discord.WebhookClient(wb.id, wb.token);
        await Webhook.send(YazılacakMesaj); 
        setTimeout(() => {
          Webhook.delete()
        }, 2000);
    })  
  } catch (err) {
    message.channel.send(err);
};
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['fakemesaj', 'fake', 'fm'],
  permLevel: 0,
 
};

exports.help = {
  name: 'fakemesaj',
};