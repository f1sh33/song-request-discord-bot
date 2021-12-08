require('dotenv').config();

module.exports = {
    async handle(client, message, Song, Event){
        rawMessage = message.content;
        channel = message.channel;
        let all_songs = await Song.findAll();
        let all_events = await Event.findAll();

        if (!rawMessage.startsWith(process.env.PREFIX) || message.author.bot){
            return;
        }

        //Lấy tên command và argument từ người dùng
        const args = rawMessage.split(/(?<=^\S+)\s/);
        args[0] = args[0].substring(3, args[0].length);
        console.log(args);

        
        //Báo lỗi nếu câu lệnh không tồn tại
        const command_name = args[0];
        const command = client.commands.get(command_name);
        if (!command){
            channel.send("Câu lệnh không tồn tại!");
            return;
        }

        let isAdmin = false;
        
        //Nếu chưa mở thì chưa được đăng ký
        if (command_name == "s-sreg"){
            if (args[1] && !(all_events == undefined || all_events.length == 0)) {
                command.execute(message, args[1], Song);
                return;
            }
            return;
        }

        //Không phải admin thì không được listall
        if (command_name == "s-listall") {
            isAdmin = message.member.roles.cache.some(r => (r.name === 'Admin' || r.name === "Admin phụ"));
            if (isAdmin && !(all_songs == undefined || all_songs.length == 0)) {
                command.execute(message, all_songs);
            }
            return;
        }

        //Mở đăng ký
        if (command_name == "s-startevent") {
            console.log(all_events);
            if (all_events == undefined || all_events.length == 0) {    
                isAdmin = message.member.roles.cache.some(r => (r.name === 'Admin' || r.name === "Admin phụ"));
                if (isAdmin){
                    command.execute(message, Event);
                }
                return;
            }
            else {
                channel.send("There is an event still exists.")
                return;
            }
        }

        //Đóng đăng ký
        if (command_name == "s-closereg") {
            isAdmin = message.member.roles.cache.some(r => (r.name === 'Admin' || r.name === "Admin phụ"));
            if (isAdmin){
                command.execute(message, Event);
            }
            return;
        }

        //Dọn database songs, kết thúc event
        if (command_name == "s-clearevent") {
            isAdmin = message.member.roles.cache.some(r => (r.name === 'Admin' || r.name === "Admin phụ"));
            if (isAdmin) {
                command.execute(message, Song, all_events);
                return;
            }
        }

        //Kiểm tra status
        if (command_name == "s-status") {
            isAdmin = message.member.roles.cache.some(r => (r.name === 'Admin' || r.name === "Admin phụ"));
            if (isAdmin) {
                command.execute(message, all_songs, all_events);
                return;
            }
        }

        channel.send("This message has been handled!");
    }
}