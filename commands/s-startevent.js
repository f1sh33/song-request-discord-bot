const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = {
    name: 's-startevent',
    description: 'Bắt đầu hát hò! (Only for admins)!',
    async execute(message, Event, Song){
        let all_event = await Event.findAll();
        let all_song = await Song.findAll();
        if (!(all_event == undefined || all_event.length == 0) && all_event[0].dataValues.phase == 2){
            Event.update(
                { phase: 3, queue: 1},
                { where: {eventID: all_event[0].dataValues.eventID} }
            )
            .then(() => {
                message.channel.send("Bắt đầu hát hò thôi!");
                const embedMessage = new MessageEmbed()
                    .setTitle("Danh sách bài hát đã đăng ký")
                    .setColor(process.env.EMBEDCOLOR);
                for (song of all_song){
                    embedMessage.addField("⏩ " + song.dataValues.songName, "do <@" + song.dataValues.authorID + "> yêu cầu!");
                }
               message.channel.send({ embeds: [embedMessage] });
               message.channel.send("Bài hát tiếp theo: ***" + Object.values(all_song)[0].dataValues.songName + "*** do <@" + Object.values(all_song)[0].dataValues.authorID + "> yêu cầu!")
               .then(msg => { msg.react('✅'); msg.react('❌'); })
               .catch(err => {
                   console.log(err);
                   return;
               });
            })
            .catch(err => {
                console.log(err);
                return;
            })
        }
    }
}