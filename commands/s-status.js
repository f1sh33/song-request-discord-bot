module.exports = {
    name: 's-status',
    description: 'Status of the event.',
    execute(message, all_songs, all_events){
        if ((all_songs == undefined || all_songs.length == 0) && (all_events == undefined || all_events.length == 0)) {
            message.channel.send("Không có event nào được mở!");
            return;
        }
        else {
            let data = "Event hát hò đang mở!\n";
            data = data + "Có **" + all_songs.length + "** bài hát đã được đăng ký!\n";
            data = data + ((all_events == undefined || all_events.length == 0) ? "Đăng ký bài mới đang **đóng**!" : "Đăng ký bài mới đang **mở**!");
            message.channel.send(data);
            return;
        }
    }

}