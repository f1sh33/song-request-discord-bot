module.exports = {
    name: 's-closereg',
    description: 'Closing registration. (Only for admins)',
    execute(message, Event){
        message.channel.send("Đăng ký bài hát đã được đóng!");
        Event.destroy({
            where: {},
            truncate: true
        });
    }

}