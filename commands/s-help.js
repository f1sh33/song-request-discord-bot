const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = {
    name: 's-help',
    description: 'Tất cả các lệnh',
    execute(message, client){
        const embedMessage = new MessageEmbed()
            .setTitle('Help')
            .setDescription('Tất cả các lệnh')
            .setColor(process.env.EMBEDCOLOR);
        const availableCommands = Array.from(client.commands.entries());

        for (var command of availableCommands) {
            embedMessage.addField(process.env.PREFIX + command[1].name, command[1].description, false);
        }
        
        message.channel.send({ embeds: [embedMessage] })
    }
}