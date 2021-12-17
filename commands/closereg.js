const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = {
    name: 'closereg',
    description: 'Đóng đợt đăng ký. (Only for admins)',
    async execute(client,message, Event, Song){
        let all_event = await Event.findAll();
        let all_song = await Song.findAll();
        if (!(all_event == undefined || all_event.length == 0) && all_event[0].dataValues.phase == 1){
            Event.update(
                { phase: 2},
                { where: {eventID: all_event[0].dataValues.eventID} }
            )
            .then(() => {
                message.channel.send("Đợt đăng ký bài hát đã được đóng!");
            })
            .catch(err => {
                console.log(err);
                return;
            });

            const embedMessage = new MessageEmbed()
                .setTitle("Danh sách bài hát đã đăng ký")
                .setColor(process.env.EMBEDCOLOR);
            for (song of all_song){
                embedMessage.addField("⏩ " + song.dataValues.songName, "do <@" + song.dataValues.authorID + "> yêu cầu!");
            }
            client.channels.cache.get('920335078570221568').send({ embeds: [embedMessage] }).catch(console.error);

            async function spam(Event, client, interval, embedMessage){
                let event = await Event.findAll().catch(err => {
                    console.log(err);
                    return;
                });
                if (event[0].dataValues.phase == 3){
                    clearInterval(interval);
                }

                client.channels.cache.get('920335078570221568').send({ embeds: [embedMessage] })
                .catch(console.error);
            }

            var interval = setInterval(() => spam(Event, client, interval, embedMessage), 5 * 1000);
        }
    }

}