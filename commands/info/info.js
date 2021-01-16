const Discord = require("discord.js")

module.exports = {
    name: 'info',
    aliases: [],
    category: 'info',
    utilisation: '{prefix}info',

    execute(client, message) {
        const embeddebug = new Discord.MessageEmbed()
        .setDescription("testowa wiadomosc / testing message")
        .setFooter(`Invoked by ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        .setTimestamp()

        message.channel.send(embeddebug)
    },
};
