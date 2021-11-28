module.exports = {
    name: 's-sreg',
    description: 'Just say hi!',
    execute(message, songname, Song){
        message.channel.send("<@" + message.author.id + "> đã đăng ký bài ***" + songname + "*** !");
        Song.create({
            requestID: message.id,
            authorId: message.author.id,
            songName: songname
        });
    }
}