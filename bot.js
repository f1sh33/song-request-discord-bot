require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const db = require('./database/db');
const Song = require('./database/models/song');
const Event = require('./database/models/event')
const Handler = require(`./handlers/handle`);

const all_commands = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'));
client['commands'] = new Discord.Collection();
for (const command_name of all_commands){
    const command = require(`./commands/${command_name}`);
    client['commands'].set(command.name, command);
} 
console.log(all_commands);


client.on('ready', () => {
    console.log("Bot logged in successfully!");
    db.authenticate().then(() => {
        console.log("Database connected!");
        Song.init(db);
        Song.sync();
        Event.init(db);
        Event.sync();
    }).catch(err => console.log(err));
});

client.on('messageCreate', async (message) => {
    rawMessage = message.content;
    channel = message.channel;
    //Chuyển message cho Handler xử lý
    Handler.handle(client, message, Song, Event);
    
});

client.login(process.env.CLIENT_TOKEN);
