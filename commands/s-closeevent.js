module.exports = {
    name: 's-closeevent',
    description: 'Kết thúc event. (Only for admins)',
    async execute(message, Song, Event){
        let all_event = await Event.findAll();
        if (!(all_event == undefined || all_event.length == 0) && all_event[0].dataValues.phase == 3){
            Song.destroy({
                where: {},
                truncate: true
            });
            Event.destroy({
                where: {},
                truncate: true
            }).then(() => {
                message.channel.send("Event hát hò đã được đóng! Hẹn các bạn tuần sau!");
            });
        }
        
    }

}