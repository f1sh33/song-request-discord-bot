require('dotenv').config();

module.exports = {
    name: 's-startevent',
    description: 'Start a song-requesting event (Only for admins)',
    execute(message, Event){
        message.channel.send("Event hát hò đã được mở bởi <@" + message.author.id + ">. Hãy đăng ký bài hát bằng cú pháp `" + process.env.PREFIX + "s-sreg + <Tên bài hát>`!");
        Event.create({
            eventID: message.id,
            authorID: message.author.id
        });
    }

}