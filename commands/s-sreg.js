module.exports = {
    name: 's-sreg',
    description: 'Đăng ký bài hát.',
    async execute(message, songname, Song, Event){
        let all_event = await Event.findAll();
        if (!(all_event == undefined || all_event.length == 0) && all_event[0].dataValues.phase == 1){
            Song.create({
                requestID: message.id,
                authorID: message.author.id,
                songName: songname
            })
            .then(() => {
                message.channel.send("<@" + message.author.id + "> đã đăng ký bài ***" + songname + "*** !");
            })
            .catch(err => {
                console.log(err);
                return;
            });
        }
    }
}