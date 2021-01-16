const Discord = require("discord.js")
const fs = require("fs")
require("dotenv").config()
const client = new Discord.Client({
    disableMentions: "everyone"
})

client.commands = new Discord.Collection()

const config = {
    token: process.env.TOKEN,
    prefix: process.env.PREFIX
}

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Załadowano Komende: ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Załadowano Event: ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

client.login(config.token)
