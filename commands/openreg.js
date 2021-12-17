require('dotenv').config();

module.exports = {
    name: 'openreg',
    description: 'Mở đợt đăng ký (Only for admins)',
    async execute(message, Event){
        let all_event = await Event.findAll();
        if (!(all_event == undefined || all_event.length == 0)){
            message.channel.send("Event vẫn đang diễn ra!");
        }
        else {
            Event.create({
                eventID: message.id,
                authorID: message.author.id,
                phase: 1,
                queue: 0
            })
            .then(() => {
                message.channel.send("Đợt đăng ký event hát hò đã được mở bởi <@" + message.author.id + ">. Hãy đăng ký bài hát bằng cú pháp `" + process.env.PREFIX + "sreg + <Tên bài hát>`!");
            })
            .catch(err => {
                console.log(err);
                return;
            });
        }
    }

}