const Discord = require('discord.js');
const database = require('quick.db');

exports.run = async (client, message, args) => {

let argslar = ['add', 'remove', 'set', 'clear'];
if(!args[0] || !argslar.includes(args[0])) {

let prefixes = ['1. <@!'+client.user.id+'>'];
const prefixler = await database.fetch(`prefixes.${message.guild.id}`);
if(prefixler && prefixler.length >= 1) {
var i = 1;
for(const key in prefixler) {
i++
prefixes.push(i+'. '+prefixler[key]);
};
};

const embed = new Discord.MessageEmbed()
.addField(`${message.guild.name}`, `Sunucusunda ${prefixes.length} Tane Prefix Bulunmakta`)
.setColor('BLUE')
.setFooter(`Punisher`)
.setDescription(prefixes.join('\n'));
return message.channel.send(embed);

};

if(args[0] === 'add') {
if(!args[1]) return;
if(args[1].startsWith('"') && args[args.length-1].endsWith('"')) {
let arg = args.slice(1).join(' ').slice(1, args.slice(1).join(' ').length-1);
const prefixler = await database.fetch(`prefixes.${message.guild.id}`);
if(prefixler && prefixler.some(a => a === arg)) return message.channel.send(`${arg} Prefixi Eklendi`);  
await database.push(`prefixes.${message.guild.id}`, arg);
return message.channel.send(`${arg} Prefixi Eklendi`);
};
if(args[2]) return message.channel.send("Lütfen Sadece Bir Prefix Giriniz.");
const prefixler = await database.fetch(`prefixes.${message.guild.id}`);
if(prefixler && prefixler.some(a => a === args[1])) return message.channel.send(`${args[1]} Prefixi Eklendi`);  
await database.push(`prefixes.${message.guild.id}`, args[1]);
return message.channel.send(`${args[1]} Prefixi Eklendi`);
};

if(args[0] === 'remove') {
if(!args[1]) return;
if(args[1].startsWith('"') && args[args.length-1].endsWith('"')) {
let arg = args.slice(1).join(' ').slice(1, args.slice(1).join(' ').length-1);
const prefixler = await database.fetch(`prefixes.${message.guild.id}`);
if(prefixler && !prefixler.some(a => a === arg)) return message.channel.send('Böyle Bir Prefix Bulunamadı.');  
await database.set(`prefixes.${message.guild.id}`, prefixler.filter(a => a !== arg));
return message.channel.send(`${arg} Prefixi Silindi`);
};
if(args[2]) return message.channel.send("Lütfen Sadece Bir Prefix Giriniz.");
const prefixler = await database.fetch(`prefixes.${message.guild.id}`);
if(prefixler && !prefixler.some(a => a === args[1])) return message.channel.send('Böyle Bir Prefix Bulunamadı.');  
await database.set(`prefixes.${message.guild.id}`, prefixler.filter(a => a !== args[1]));
return message.channel.send(`${args[1]} Prefixi Silindi`);
};

if(args[0] === 'set') {
if(!args[1]) return;
if(args[1].startsWith('"') && args[args.length-1].endsWith('"')) {
let arg = args.slice(1).join(' ').slice(1, args.slice(1).join(' ').length-1);
await database.delete(`prefixes.${message.guild.id}`);
await database.push(`prefixes.${message.guild.id}`, arg);
return message.channel.send(`Bu Sunucudaki Yeni Prefixim: ${arg}.`);
};
if(args[2]) return message.channel.send("Lütfen Sadece Bir Prefix Giriniz.");
await database.delete(`prefixes.${message.guild.id}`);
await database.push(`prefixes.${message.guild.id}`, args[1]);
return message.channel.send(`Bu Sunucudaki Yeni Prefixim: ${args[1]}.`);
};

if(args[0] === 'clear') {
await database.delete(`prefixes.${message.guild.id}`);
return message.channel.send('Özel Prefixler Silindi, Yeni Prefix Ayarlamak İçin +prefix add <prefix>.');
};

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'prefix'
};