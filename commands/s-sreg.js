module.exports = {
    name: 's-sreg',
    description: 'Register Songs',
    execute(message, songname, Song){
        message.channel.send("<@" + message.author.id + "> đã đăng ký bài ***" + songname + "*** !");
        Song.create({
            requestID: message.id,
            authorID: message.author.id,
            songName: songname
        });
    }
}