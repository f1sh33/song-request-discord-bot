module.exports = {
    name: 's-clearevent',
    description: 'Closing event. (Only for admins)',
    execute(message, Song, all_events){
        if (!(all_events == undefined || all_events.length == 0)) {
            message.channel.send("Hãy đóng đăng ký trước!");
            return;
        }
        message.channel.send("Event hát hò đã được đóng!");
        Song.destroy({
            where: {},
            truncate: true
        });
    }

}