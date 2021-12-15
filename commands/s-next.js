module.exports = {
    name: 's-next',
    description: 'Thông báo bài tiếp theo vào vote.',
    async execute(message, Event, Song){
        let all_event = await Event.findAll();
        let all_song = await Song.findAll();
        if (!(all_event == undefined || all_event.length == 0) && all_event[0].dataValues.phase == 3){
            let queue = all_event[0].dataValues.queue;
            if (queue + 1 <= all_song.length) {
                queue += 1;
                Event.update(
                    { queue: queue },
                    { where: { eventID: all_event[0].dataValues.eventID } }
                );
                const nextsong = Song.findAll(
                    { where: {soThuTu: queue} }
                ).then((song) => {
                    message.channel.send("Bài hát tiếp theo: ***" + song[0].dataValues.songName + "***  do <@" + song[0].dataValues.authorID + "> yêu cầu!")
                        .then(msg => { msg.react('✅'); msg.react('❌'); })
                        .catch(err => {
                            console.log(err);
                            return;
                    });
                })
                .catch(err => {
                    console.log(err);
                    return;
                });
            }
            else {
                message.channel.send("Danh sách đã hết!")
            }
        }
    }
}