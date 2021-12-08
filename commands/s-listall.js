module.exports =  {
    name: 's-listall',
    description: 'List all songs',
    async execute(message, all_songs){
        payload = ""
        for (song of all_songs){
            payload += song.dataValues.soThuTu + ". ***" + song.dataValues.songName + "*** do <@" + song.dataValues.authorID + "> yêu cầu!\n"
        }
        channel.send(payload);
    }
}