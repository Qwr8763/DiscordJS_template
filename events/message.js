const Discord = require("discord.js")
let cooldown = new Set()
let cooltime = 3;

module.exports = (client, message) => {

    const mentionRegex = RegExp(`^<@!?${client.user.id}>$`);

    if (message.author.bot || message.channel.type === 'dm') return;

    const embed = new Discord.MessageEmbed()
    .setTitle("Informacje o bocie")
    .setColor("#009dff")
    .setThumbnail(client.user.displayAvatarURL())
    .addField("<:admin:794637319163346994> Owner", "Qwr11#8763")
    .addField("<:tools_:794642085457821747> Prefix", "/")
    .addField("<:x_:794637707099897897> Dostępne komendy", "/help")
    .setFooter(`Invoked by ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
    .setTimestamp()

    if (message.content.match(mentionRegex)) message.channel.send(embed);

    const prefix = process.env.PREFIX

    if (message.content.indexOf(prefix) !== 0) return;

    if(cooldown.has(message.author.id)) {

        const embedcoolown = new Discord.MessageEmbed()
        .setTitle("Cooldown")
        .setColor("#ff0000")
        .setDescription("Możesz używać komend co 3 sekundy!")
        .setFooter(`Invoked by ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        .setTimestamp()

        return message.channel.send(embedcoolown)
    }
    cooldown.add(message.author.id)

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, cooltime * 1000)


    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(client, message, args);
    if(!cmd) message.react("794992296302215178")
};
