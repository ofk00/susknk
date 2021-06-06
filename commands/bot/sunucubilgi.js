const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr");

exports.run = async (client, message, args) => {

  let kuruluş = `${moment(message.guild.createdAt).format("LL")} | (${moment(
    message.guild.createdAt
  ).fromNow()})`;
  let region = message.guild.region
    .replace("europe", "Avrupa")
    .replace("russia", "Rusya")
    .replace("japan", "Japonya")
    .replace("india", "Hindistan")
    .replace("hongkong", "Hong Kong")
    .replace("brazil", "Brezilya")
    .replace("sydney", "Sydney")
    .replace("southafrica", "Güney Afrika")
    .replace("singapore", "Singapur")
    .replace("us-south", "Güney Amerika")
    .replace("us-central", "Amerika")
    .replace("us-east", "Doğu Amerika")
    .replace("us-west", "Batı Amerika");

  let verification = message.guild.verificationLevel
    .replace("NONE", "Yok")
    .replace("LOW", "Düşük")
    .replace("MEDIUM", "Orta")
    .replace("VERY_HIGH", "Çok yüksek")
    .replace("HIGH", "Yüksek");

  let Features = {
    ANIMATED_ICON: "Animasyonlu simge",
    BANNER: "Sunucu afişi",
    COMMERCE: "Ticaret özellikleri",
    COMMUNITY: "Topluluk",
    DISCOVERABLE: "Keşfedilebilir",
    FEATURABLE: "Özellikli",
    INVITE_SPLASH: "Davet arkaplanı",
    NEWS: "Duyuru kanalları",
    PARTNERED: "Partner sunucu",
    VANITY_URL: "Özel link",
    VERIFIED: "Doğrulanmış sunucu",
    WELCOME_SCREEN_ENABLED: "Hoş geldin ekranı",
    MEMBER_VERIFICATION_GATE_ENABLED: "Üye doğrulaması",
    VIP_REGIONS: "384kbps sesli kanal özelliği",
    PREVIEW_ENABLED: "Önizleme aktif"
  };

  var emojis;
    if (message.guild.emojis.cache.size === 0) {
        emojis = 'Yok';
    } else {
        emojis = message.guild.emojis.cache.size;
    }

  const embed = new MessageEmbed()
    .setTitle(message.guild.name)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setColor(`BLUE`)
    .addField(
      `≽ Sunucu bilgisi`,
      `
**ID:** ${message.guild.id}
**Sunucu Sahibi:** ${message.guild.owner} (**${
        message.guild.owner.id
      }**)
**Bölge:** ${region}
**Doğrulama seviyesi:** ${verification}
**Sunucu kuruluş tarihi:** ${kuruluş}
`
    )
    .addField(
      `≽ Sunucu istatistikleri`,
      `
**Üyeler:** ${message.guild.members.cache.size} Üye (${
        message.guild.members.cache.filter(x => x.user.bot == true).size
      } bot)
**Roller:** ${message.guild.roles.cache.map(roles => `\`${roles.name}\``).splice(1,11).reverse().join(' | ')} **(${message.guild.roles.cache.size})**
**Kanallar:** ${
        message.guild.channels.cache.filter(x => x.type == "category").size
      } kategori, ${
        message.guild.channels.cache.filter(x => x.type == "text").size
      } yazı kanalı, ${
        message.guild.channels.cache.filter(x => x.type == "voice").size
      } ses kanalı
**Emojiler:** ${emojis}/100
**Boost sayısı:** ${message.guild.premiumSubscriptionCount}
**Boost seviyesi:** ${message.guild.premiumTier}
`
    )


    .addField(
      `≽ Sunucu özellikleri (${message.guild.features.length})`,
      `${message.guild.features
        .map(a => Features[a] || a)
        .join(", ") || "Sunucu özelliği yok"}`
    )
    .setFooter(`Punisher  |  ${message.author.tag} Tarafından İstendi`, message.author.avatarURL({ dynamic: true }))
    .setTimestamp();

  message.channel.send(embed);
};

exports.conf = {
  aliases: ["sunucu-bilgi", "server", "server-info", "sunucubilgi"]
};

exports.help = {
  name: "sunucu",
  description: "Sunucu hakkında bilgiler verir",
  usage: "sunucu",
  perm: ""
};