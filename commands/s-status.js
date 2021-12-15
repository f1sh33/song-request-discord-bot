module.exports = {
    name: 's-status',
    description: 'Trạng thái.',
    async execute(message,Event, Song){
        let all_song = await Song.findAll();
        let all_event = await Event.findAll();
        if ((all_song == undefined || all_song.length == 0) && (all_event == undefined || all_event.length == 0)) {
            message.channel.send("Không có event nào được mở!");
            return;
        }
        else {
            let data = "Event đang mở!\n";
            data = data + "Có **" + all_song.length + "** bài hát đã được đăng ký!\n";
            data = data + ((all_event[0].dataValues.phase == 1) ? "Đăng ký bài mới đang **mở**!" : "Đăng ký bài mới đang **đóng**!");
            message.channel.send(data);
            return;
        }
    }

}