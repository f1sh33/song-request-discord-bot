require('dotenv').config();

module.exports = {
    async handle(client, message, Song){
        rawMessage = message.content;
        channel = message.channel;
        let all_songs = await Song.findAll();
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

        
        if (command_name == "s-sreg"){
            if (!args[1]) {
                channel.send("Cú pháp không đúng!");
                return;
            }
            command.execute(message, args[1], Song);
            return;
        }

        if (command_name == "s-listall") {
            command.execute(message, all_songs);
        }

        channel.send("This message has been handled!");
    }
}