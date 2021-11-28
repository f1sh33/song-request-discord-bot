module.exports =  {
    name: 's-listall',
    description: 'Zhong Xina.',
    async execute(message, all_songs){
        payload = ""
        for (song of all_songs){
            payload += song.dataValues.soThuTu + ". ***" + song.dataValues.songName + "*** do <@" + song.dataValues.authorId + "> yêu cầu!\n"
        }
        channel.send(payload);
    }
}