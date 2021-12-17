const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports =  {
    name: 'listall',
    description: 'Liệt các bài hát trong danh sách.',
    async execute(message, Song){
        let all_song = await Song.findAll();
        if (all_song.length == 0){
            return;
        }
        const embedMessage = new MessageEmbed()
            .setTitle("Danh sách bài hát đã đăng ký")
            .setColor(process.env.EMBEDCOLOR);
        for (song of all_song){
            embedMessage.addField("⏩ " + song.dataValues.songName, "do <@" + song.dataValues.authorID + "> yêu cầu!");
        }
        message.channel.send({ embeds: [embedMessage] });
    }
}