const Discord = require("discord.js");
const database = require('quick.db');

exports.run = async (client, message) => {

let punisherprefix = ('+')
let prefix = await database.fetch(`prefixes.${message.guild.id}`) || punisherprefix

var page = 0;
  
let arr = [
  `**PREFİX KOMUTLARI**\n\n
${prefix}prefix\n **Sunucunuzdaki Tüm Prefixleri Görüntülersiniz**\n
${prefix}prefix add <prefix>\n **Sunucunuza Prefix Eklersiniz**\n
${prefix}prefix remove <prefix>\n **Sunucunuza Eklediğiniz Prefixi Silersiniz**\n
${prefix}prefix clear\n **Sunucunuza Eklediğiniz Tüm Prefixleri Silersiniz**`,
 `**MODERASYON KOMUTLARI**\n\n
${prefix}forceban <id>\n **İD Girerek Yasaklarsınız**\n
${prefix}unban <id>\n **İD Girerek Yasaklama Kaldırırsınız**\n
${prefix}çek <kullanıcı>\n **Sesteki Kullanıcıyı Etiketleyerek Yanınıza Çekersiniz**\n
${prefix}sil <miktar>\n **Belirtilen Miktarda Mesajı Silersiniz**\n
${prefix}sunucubilgi\n **Sunucu Bilgilerini Verir**\n
${prefix}rolbilgi <rol>\n **Belirtilen Rolün Bilgilerini Verir**\n
${prefix}kanalbilgi <kanal>\n **Belirtilen Kanalın Bilgilerini Verir**\n
${prefix}kullanıcıbilgi <kullanıcı>\n **Belirtilen Kullanıcının Bilgilerini Verir**\n
${prefix}rolver <kullanıcı> <rol>\n **Belirtilen Kullanıcıya Belirtilen Rolü Verirsiniz**\n
${prefix}rolal <kullanıcı> <rol>\n **Belirtilen Kullanıcıdan Belirtilen Rolü Alırsınız**\n
${prefix}modlog <kanal>/<kapat/sıfırla>\n **Sunucu Loglarını Belirtilen Kanala Atar**`,
`**GENEL KOMUTLAR**\n\n
**__${prefix}oynat__**\n
${prefix}avatar <kullanıcı>\n **Belirtilen Kullanıcının Avatarını Atar**\n
${prefix}oylama [konu]\n **Oylama Yaparsınız**\n
${prefix}resim\n **Gönderilen Resimdeki Yazıları Atar**\n
${prefix}steam <oyun>\n **Steam'da Oyun Oyun Aratırsınız**\n
${prefix}ip <ip>\n **Girilen İp Bilgilerini Verir**\n
${prefix}lol <bölge> <nickname>\n **Girilen İsmin İstatistiklerini Verir**\n
${prefix}youtube <kelime>\n **Youtube'da Kelimeler Aratırsınız**\n
${prefix}google <kelime>\n **Google'da Kelimeler Aratırsınız**\n
${prefix}yazıtura\n **Yazı-Tura Oynarsınız**\n
${prefix}fakemesaj <id>\n **Webhook Yoluyla Farklı Kullanıcının İsmiyle Fake Mesaj Atarsınız**\n
${prefix}korona <kullanıcı>\n **Korona İstatistikleri Hakkında Bilgi Alırsınız**\n
${prefix}iftar <sehir>\n **Belirlenen Şehrin İftar Saatini Alırsınız**\n
${prefix}hava <sehir>\n **Belirlenen Şehrin Hava Durumunu Alırsınız**\n`,
`**BOT İSTATİSTİK KOMUTLARI**\n\n
${prefix}istatistik\n **Bot İstatistiklerini Öğrenirsiniz**\n
${prefix}istek\n **Bota Getirilmesini İstediklerinizi Belirtirsiniz**\n
${prefix}komutlar\n **Botta Bulunan Komut Sayısını Öğrenirsiniz**\n
${prefix}davet\n **Bot Davet Linki Ve Destek Sunucusunu Görüntülersiniz**`
];



//console.log(arr)
let embd = new Discord.MessageEmbed()
message.channel.send(embd.setDescription(arr[0]).setThumbnail(message.author.displayAvatarURL({ dynamic: true })).setFooter(`Sayfa ${page+1} / ${arr.length+1}`)).then(async msg => {
      await msg.react("⬅️");
      await msg.react("➡️");

      let filter = (reaction, user) => user.id !== message.client.user.id && user.id === message.author.id;

      var collector = msg.createReactionCollector(filter, {
        time: 120000
      });

      collector.on("collect", async (reaction, user) => {
        switch (reaction.emoji.name) {
          case "⬅️":
            reaction.users.remove(user).catch(console.error);
            if (page == 0) return;
            --page

              embd.setColor("RANDOM");
              embd.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
              embd.setFooter(`Sayfa ${page+1} / ${arr.length+1}`);
              embd.setDescription(arr[page])
            msg.edit(embd)
           break;
          case "➡️":
            if (page == arr.length) return;
            ++page
            reaction.users.remove(user).catch(console.error);
              embd.setColor("RANDOM");
              embd.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
              embd.setFooter(`Sayfa ${page+1} / ${arr.length+1}`);
              embd.setDescription(arr[page] || `<@!${message.author.id}> Tarafından İstendi
              Davet İçin [Tıkla](https://top.gg/bot/657944543219679255/invite)`)
            msg.edit(embd)
          break;

        }
      });

})
}
exports.conf = {
  enabled: true,
  aliases: ['y', 'help'],
  permLevel: 0
};

exports.help = {
  name: "yardım"
};