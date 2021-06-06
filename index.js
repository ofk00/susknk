const Discord = require('discord.js')
const client = new Discord.Client()
const Util = require('discord.js')
const ayarlar = require('./config.json')
const {config, prefix, offical_fio, token} = require("./config.json")
const fs = require("fs")
const AsciiTable = require('ascii-table')
require('./util/eventHandler.js') (client)
const axios = require("axios").default;
const db = require('quick.db')
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { constants } = require('crypto');
const Moment = require('moment')
const moment = require('moment')

/////Command Handler
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdirSync('./commands').forEach(dir => {
const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const komutcuklar = require(`./commands/${dir}/${file}`);
  if (komutcuklar.help.name) {
  client.commands.set(komutcuklar.help.name, komutcuklar);
  console.log(`[Punisher]Yüklenen Komut ${dir}/${file}`)
} else {
  continue;
    }
    komutcuklar.conf.aliases.forEach(alias => {
      client.aliases.set(alias, komutcuklar.help.name);
    });
  }
})
//İzinler
client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === offical_fio) permlvl = 4;
  return permlvl;
};



client.on("guildCreate", guild => {
  let log = client.channels.cache.get(`796861138439503873`);
  const embed = new Discord.MessageEmbed()
    .setAuthor("EKLENDİM")
    .setThumbnail(
      guild.iconURL ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9J1LKrqyj9OhkVIqldc8cIjHbL7YpCaCx03L04NwadHxZgn8l"
    )
    .setColor("GREEN")
    .addField("Sunucu İsmi:", `**${guild.name}**`)
    .addField("Sunucu ID:", `\`\`\`${guild.id}\`\`\``)
    .addField(
      "Sunucu Bilgisi:",
      `**Sunucu Sahibi: ${guild.owner}\nSunucu Sahibi ID: \`${guild.owner.id}\`\nSunucu Sahibi: \`${guild.owner.displayName}#${guild.owner.user.discriminator}\`\nSunucu Bölgesi: \`${guild.region}\`\nÜye Sayısı: \`${guild.memberCount}\`\nKanal Sayısı: \`${guild.channels.cache.size}\`**`
    )
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL);
  log.send(embed);
});
client.on("guildDelete", guild => {
  let log = client.channels.cache.get("796861138439503873");
  const embed = new Discord.MessageEmbed()
    .setAuthor("ATILDIM")
    .setThumbnail(
      guild.iconURL ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9J1LKrqyj9OhkVIqldc8cIjHbL7YpCaCx03L04NwadHxZgn8l"
    )
    .setColor("RED")
    .addField("Sunucu İsmi:", `**${guild.name}**`)
    .addField("Sunucu ID:", `\`\`\`${guild.id}\`\`\``)
    .addField(
      "Sunucu Bilgisi:",
      `**Sunucu Sahibi: ${guild.owner}\nSunucu Sahibi ID: \`${guild.owner.id}\`\nSunucu Sahibi: \`${guild.owner.displayName}#${guild.owner.user.discriminator}\`\nSunucu Bölgesi: \`${guild.region}\`\nÜye Sayısı: \`${guild.memberCount}\`\nKanal Sayısı: \`${guild.channels.cache.size}\`**`
    )
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL);
  log.send(embed);
});

client.login(token);

client.on('message', async msg => {
  if(msg.content == `<@!657944543219679255>`) return msg.channel.send(`> **Punisher Bot | Prefix**\n\n> **Sanırım beni etiketlediniz.**\n > Prefixim: \`${prefix}\``);
});


//MODLOG

const botadi = 'Punisher  |  Log Sistemi'

client.on('messageDelete', async (message) => {
	const channelLog = message.guild.channels.cache.get(await db.get(`log_${message.guild.id}`));
	let logs = await message.guild.fetchAuditLogs({
		type: 'MESSAGE_DELETE'
	});

	let entry = logs.entries.first()
	

	const Embed = new Discord.MessageEmbed()
	.setColor('RED')
	.setAuthor(`${message.guild.name}: Bir mesaj silindi!`, message.guild.iconURL())
  .setDescription(`Bir Mesaj Silindi. \n Silinen Kanal : <#${message.channel.id}>`)
  .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
  .setFooter(`${botadi}`)
	.addFields([
		{ name: 'Mesaj Sahibi', value: `${message.author} ${message.author.tag} (${message.author.id})` },
		{ name: 'Mesajı Silen', value: `${entry.executor} ${entry.executor.tag} (${entry.executor.id})` },
		{ name: 'Mesaj İçeriği', value: message.content },
	])

	channelLog.send({ embed: Embed })
})



client.on('channelDelete', async (channel) => {
	const channelLog = client.channels.cache.get(await db.get(`log_${channel.guild.id}`));

	const channelType = channel.type
	.replace('text', 'Yazı')
	.replace('voice', 'Ses')
	.replace('category', 'Kategori')

	const channelName = channel.name

	const createdDate = `${Moment(channel.createdAt).format('LL')} | (${Moment(channel.createdAt).fromNow()})`

	let logs = await channel.guild.fetchAuditLogs({
		type: 'CHANNEL_DELETE'
	})

	let entry = logs.entries.first()

	const Embed = new Discord.MessageEmbed()
	.setColor('BLUE')
	.setAuthor(

    channel.guild.name + ": Bir Kanal Silindi",

    channel.guild.iconURL()

  )
  .setFooter(`${botadi}`)
  .setThumbnail (entry.executor.avatarURL({dynamic:true}))
	.addFields([
		{ name: 'Kanalı silen', value: `${entry.executor} (${entry.executor.id})` },
		{ name: 'Kanal ismi', value: channelName, inline: true },
    { name: 'Kanal ID', value: channel.id, inline: true },
		{ name: 'Kanal türü', value: channelType, inline: true },
		{ name: 'Kanal oluşturulma zamanı', value: createdDate, inline: true },
	])

	channelLog.send({ embed: Embed })
	
	
})

client.on('channelCreate', async (channel) => {
	const channelLog = client.channels.cache.get(await db.get(`log_${channel.guild.id}`));

	const channelType = channel.type
	.replace('text', 'Yazı')
	.replace('voice', 'Ses')
	.replace('category', 'Kategori')

	const channelName = channel.name

	const createdDate = `${Moment(channel.createdAt).format('LL')}`

	let logs = await channel.guild.fetchAuditLogs({
		type: 'CHANNEL_CREATE'
	})

	let entry = logs.entries.first()

	const Embed = new Discord.MessageEmbed()
	.setColor('BLUE')
	.setAuthor(

    channel.guild.name + ": Bir Kanal Oluşturuldu",

    channel.guild.iconURL()

  )
  .setFooter(`${botadi}`)
  .setThumbnail (entry.executor.avatarURL({dynamic:true}))
	.addFields([
		{ name: 'Kanalı oluşturan', value: `${entry.executor} (${entry.executor.id})` },
		{ name: 'Kanal ismi', value: channelName, inline: true },
    { name: 'Kanal ID', value: channel.id, inline: true },
		{ name: 'Kanal türü', value: channelType, inline: true },
		{ name: 'Kanal oluşturulma zamanı', value: createdDate, inline: true },
	])

	channelLog.send({ embed: Embed })
	
	
})

client.on("channelUpdate", async function(oldChannel, newChannel) {
  const channel = oldChannel

  const channelType = channel.type
	.replace('text', 'Yazı')
	.replace('voice', 'Ses')
	.replace('category', 'Kategori')

	const createdDate = `${Moment(channel.createdAt).format('LL')} | (${Moment(channel.createdAt).fromNow()})`


  let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first())

    let log = client.channels.cache.get(await db.get(`log_${channel.guild.id}`))
  
    const Embed = new Discord.MessageEmbed()
  
      .setAuthor(
  
        channel.guild.name + ": Bir Kanal Güncellendi",
  
        channel.guild.iconURL()
  
      )
      

      .setFooter(`${botadi}`)
      .setThumbnail (entry.executor.avatarURL({dynamic:true}))
      .setDescription(`**Kanal ismi**\n ${channel.name}\n\n **Kanal ID**\n ${channel.id}\n\n **Kanal Türü**\n ${channelType}\n\n **Kanalı Güncelleyen**\n ${entry.executor} (${entry.executor.id})\n\n **Kanal oluşturulma zamanı**\n ${createdDate}`)


	
  
      .setColor("#FFFF00");
  
    return log.send(Embed)
  });



  client.on("messageUpdate", async (oldMsg, newMsg) => {
    let message = oldMsg;
    if (oldMsg.author.bot) return;
    var user = oldMsg.author;
    if (db.has(`log_${oldMsg.guild.id}`) === false) return;
    var kanal = oldMsg.guild.channels.cache.get(db.fetch(`log_${oldMsg.guild.id}`).replace("<#", "").replace(">", ""))
    if (!kanal) return;
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setAuthor(`${message.guild.name}: Bir mesaj düzenlendi!`, message.guild.iconURL())
    .setDescription(`Bir Mesaj Düzenlendi. \n Düzenlenen Kanal : <#${message.channel.id}>`)
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .addField("Mesaj Sahibi", `<@!${oldMsg.author.id}> ${oldMsg.author.tag} (${oldMsg.author.id})`, true)
    .addField("Eski Mesaj",`  ${oldMsg.content}  `)
    .addField("Yeni Mesaj", `${newMsg.content}`)
    .addField("Mesaja Gitmek İçin", `[Tıkla](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
    .setFooter(`${botadi}`)
    kanal.send(embed);  
          
      });

      client.on("roleCreate",async function(role) {
        const entry = await role.guild.fetchAuditLogs().then(audit => audit.entries.first());

        let log = role.guild.channels.cache.get(await db.get(`log_${role.guild.id}`));
        
        
          let embed = new MessageEmbed();
        
          embed
        
            .setAuthor(role.guild.name + ": Bir Rol Oluşturuldu!!", role.guild.iconURL())
        
            .setDescription(
        
              ` **${role.name}**(\`${role.id}\`) Adlı Rol Oluşturuldu!\n\n Oluşturan Kişi : <@${entry.executor.id}>(\`${entry.executor.id}\`)`
        
            )
        
          .setThumbnail (entry.executor.avatarURL({dynamic:true}))

          .setFooter(`${botadi}`)

            .setColor("#FFFF00");
        
          return log.send(embed);
        
        });
        
        client.on("roleDelete", async function(role) {
        const entry = await role.guild.fetchAuditLogs().then(audit => audit.entries.first());

        let log = role.guild.channels.cache.get(await db.get(`log_${role.guild.id}`));
        
        
          let embed = new MessageEmbed();
        
          embed
        
            .setAuthor(role.guild.name + ": Bir Rol Silindi!", role.guild.iconURL())
        
            .setDescription(`**${role.name}**(\`${role.id}\`) Adlı Rol Silindi!\n\n Silen Kişi : <@${entry.executor.id}>(\`${entry.executor.id}\`)`)

        .setThumbnail (entry.executor.avatarURL({dynamic:true}))

        .setFooter(`${botadi}`)
            .setColor("#FFFF00");
        
          return log.send(embed);
        
        });

        client.on("guildBanAdd", async(guild, user) => {

          let log = guild.channels.cache.get(await db.get(`log_${guild.id}`));


          const entry = await guild.fetchAuditLogs().then(audit => audit.entries.first());
          
          let embed = new Discord.MessageEmbed()
          embed
          
          
          
          
          .setAuthor(guild.name + ": Bir Kullanıcı Yasaklandı!", guild.iconURL())
          
              .setDescription(
          
                `<@!${user.id}> **${user.username}**(\`${user.id}\`) Adlı Kullanıcı Sunucudan Yasaklandı\n\n Yasaklayan Kişi **<@${entry.executor.id}>**(\`${entry.executor.id}\`)`
          
              )
            .setThumbnail(entry.executor.avatarURL({dynamic:true}))
          .setFooter(`${botadi}`)
              .setColor("#E70000")
          
          
          
          .setTimestamp()
          
          
          log.send(embed)
          
          })
          
          client.on("guildBanRemove", async(guild, user, message) => {

            let log = guild.channels.cache.get(await db.get(`log_${guild.id}`));
          
          
          const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());
          
          let embed = new Discord.MessageEmbed()
          
            
          
            embed
          
            .setAuthor(guild.name + ": Bir Kullanıcının Yasaklaması Açıldı!", guild.iconURL())
          .setThumbnail (entry.executor.avatarURL({dynamic:true}))

          .setFooter(`${botadi}`)
              .setDescription(
          
                `<@!${user.id}> **${user.username}**(\`${user.id}\`) Adlı Kullanıcının Yasaklaması Açıldı.\n\n Yasaklamayı Açan Kişi : **<@${entry.executor.id}>**(\`${entry.executor.id}\`)`
          
              )
          
              .setColor("#E70000")
          
          
          
          
          .setTimestamp()
                                           
          
          
          log.send(embed)
          
          });

          client.on('emojiCreate', async emoji => {
            let modlogs = db.get(`log${emoji.guild.id}`)
            let entry = await role.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first())
            let user = client.users.cache.get(entry.executor.id)
             const modlogkanal = emoji.guild.channels.cache.find(kanal => kanal.id === modlogs);
             if(!modlogs) return;
             if(modlogs) {
               let embed = new Discord.MessageEmbed()
               .setColor("#fffa00")
               .setAuthor(`${message.guild.name}: Bir Emoji Eklendi!`, emoji.guild.iconURL())
               .addField(`Oluşturulan Emojinin İsmi : `, `${emoji.name}`)
               .addField(`Emoji Silen : `, `<@${user.id}>`)
               .setThumbnail (entry.executor.avatarURL({dynamic:true}))
               .setFooter(`${botadi}`)
               .setTimestamp()
               modlogkanal.send(embed)
             }
           });

           client.on('emojiDelete', async emoji => {
            let modlogs = db.get(`log_${emoji.guild.id}`)
            let entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first())
            let user = client.users.cache.get(entry.executor.id)
             const modlogkanal = emoji.guild.channels.cache.find(kanal => kanal.id === modlogs);
             if(!modlogs) return;
             if(modlogs) {
               let embed = new Discord.MessageEmbed()
               .setColor("#fffa00")
               .setAuthor(`${message.guild.name}: Bir Emoji Eklendi!`, emoji.guild.iconURL())
               .addField(`Silinen Emojinin İsmi : `, `${emoji.name}`)
               .addField(`Emojiyi Silen : `, `<@${user.id}>`)
               .setThumbnail (entry.executor.avatarURL({dynamic:true}))
               .setFooter(`${botadi}`)
               .setTimestamp()
               modlogkanal.send(embed)
             }
           });

           client.on('guildUpdate', async (oldGuild, newGuild) => {
            const channelLog = client.channels.cache.get(await db.get(`log_${oldGuild.id}`));
            let logs = await oldGuild.fetchAuditLogs({
              type: 'GUILD_UPDATE'
            })
          
            let entry = logs.entries.first()
          
            const Embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setAuthor(`${oldGuild.name}: Sunucu Güncellendi!`, oldGuild.iconURL())
            .setThumbnail(entry.executor.avatarURL({dynamic:true}))
            .setFooter(`${botadi}`)
            .addFields([
              { name: 'Sunucuyu güncelleyen', value: `${entry.executor} (${entry.executor.id})` },
              { name: 'Önceki sunucu adı', value: oldGuild.name, inline: true },
              { name: 'Yeni sunucu adı', value: newGuild.name, inline: true },
            ])
          
            channelLog.send({ embed: Embed })
          
          })

          client.on("channelPinsUpdate", async function(channel, time) {


            let log = channel.guild.channels.cache.get(await db.get(`log_${channel.guild.id}`));
          
            let embed = new MessageEmbed();
          
            embed
          
              .setAuthor(channel.guild.name + ": Sabitlemelerde Değişiklik Yapıldı", channel.guild.iconURL())
          
              .setDescription(
          
                ` **#${channel.name}**(\`${channel.id}\`) adlı kanal'da Sabitlemelerde Değişiklik Yapıldı.\n\n Yapılan Zaman : **${Moment(channel.createdAt).format('LL')}**`
          
              )
          
          .setFooter(`${botadi}`)
          
              .setColor("#E70000");
          
            return log.send(embed);
          
          });

//Oynat Sistemi

const ACTIVITIES = {
  "poker": {
      id: "755827207812677713",
      name: "Poker Night"
  },
  "betrayal": {
      id: "773336526917861400",
      name: "Betrayal.io"
  },
  "youtube": {
      id: "755600276941176913",
      name: "YouTube Together"
  },
  "fishington": {
      id: "814288819477020702",
      name: "Fishington.io"
  }
};

client.on("message", async message => {
  let punisherprefix = ('+')
  let prefix2 = db.fetch(`prefixes.${message.guild.id}`) || punisherprefix

  if (message.author.bot || !message.guild) return;
  if (message.content.indexOf(prefix2) !== 0) return;


  const args = message.content.slice(prefix2.length).trim().split(" ");
  const cmd = args.shift().toLowerCase();

  

  if (cmd === "ping") return message.channel.send(`Pong! \`${client.ws.ping}ms\``);

  if (cmd === "yttogether") {
      const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
      if (!channel || channel.type !== "voice") return message.channel.send("Kanal Bulunamadı!");
      if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send("Davet oluşturma iznine ihtiyacım var!");

      fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
          method: "POST",
          body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: "830427926482255902", // youtube together
              target_type: 2,
              temporary: false,
              validate: null
          }),
          headers: {
              "Authorization": `Bot ${client.token}`,
              "Content-Type": "application/json"
          }
      })
          .then(res => res.json())
          .then(invite => {
              if (invite.error || !invite.code) return message.channel.send("YouTube Birlikte başlatılamadı!");
              const embed1 = new MessageEmbed()
              .setDescription(`**Punisher Activities** 'i Başlatmak İçin Tıklayın [**${channel.name}**](https://discord.gg/${invite.code})`)
              .setFooter(`Punisher  |  ${message.author.tag} Tarafından İstendi`, message.author.avatarURL({ dynamic: true }))
              message.channel.send(embed1).then(msg => msg.delete({timeout:60000}));
          })
          .catch(e => {
              message.channel.send("**Punisher Activities** başlatılamadı!");
          })
  }
 
  
 

  // or use this
  if (cmd === "oynat") {
      const channel = message.guild.channels.cache.get(args[0]);
      if (!channel || channel.type !== "voice") return message.channel.send(`**Şu Şekillerde Kullanınız; \n**-------------------------------------** \n ${prefix2}oynat <kanal id> youtube | Youtube Üzerinden Video Oynatırsınız! \n ${prefix2}oynat <kanal id> poker | Poker Oyunu Oynarsınız! \n ${prefix2}oynat <kanal id> betrayal | Betrayal Oyunu Oynarsınız! \n ${prefix2}oynat <kanal id> fishington | Fishington Oyunu Oynarsınız!**`);
      if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send("CREATE_INSTANT_INVITE iznine ihtiyacım var");
      const activity = ACTIVITIES[args[1] ? args[1].toLowerCase() : null];
      if (!activity) return message.channel.send(`Doğru formatlar: \n${Object.keys(ACTIVITIES).map(m => `- **${prefix2}activity <Channel_ID> ${m}**`).join("\n")}`);

      fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
          method: "POST",
          body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: activity.id,
              target_type: 2,
              temporary: false,
              validate: null
          }),
          headers: {
              "Authorization": `Bot ${client.token}`,
              "Content-Type": "application/json"
          }
      })
          .then(res => res.json())
          .then(invite => {
              if (invite.error || !invite.code) return message.channel.send(`Başlatılamadı **${activity.name}**!`);
              const embed2 = new MessageEmbed()
              .setDescription(`**${activity.name}** Başlatmak İçin Tıklayın [**${channel.name}**](https://discord.gg/${invite.code})`)
              .setFooter(`Punisher  |  ${message.author.tag} Tarafından İstendi`, message.author.avatarURL({ dynamic: true }))
              message.channel.send(embed2).then(msg => msg.delete({timeout:60000}));
          })
          .catch(e => {
              message.channel.send(`Başlatılamadı **${activity.name}**!`);
          })
  }
});