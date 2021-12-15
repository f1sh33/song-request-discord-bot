require('dotenv').config();

module.exports = {
    async handle(client, message, Song, Event){
        const rawMessage = message.content;
        if (!rawMessage.startsWith(process.env.PREFIX) || message.author.bot){
            return;
        }

        //Lấy tên command và argument từ người dùng
        const args = rawMessage.split(/(?<=^\S+)\s/);
        args[0] = args[0].substring(process.env.PREFIX.length, args[0].length);
        console.log(args);

        //Kiểm tra lệnh có tồn tại không
        const command_name = args[0];
        const command = client.commands.get(command_name);
        if (!command){
            return;
        }

        let isAdmin = false;
        
        //Lệnh cho admin
        isAdmin = message.member.roles.cache.some(r => (r.name === 'Admin' || r.name === "Admin phụ"));
        if (isAdmin){
            //Mở đợt đăng ký, cho phép người dùng sử dụng s-sreg
            if (command_name == "s-openreg"){
                command.execute(message, Event);
                return;
            }
            //Đóng đợt đăng ký, spam danh sách vào kênh riêng, chờ admin bắt đầu mở đợt hát
            else if (command_name == "s-closereg"){
                command.execute(client, message, Event, Song);
                return;
            }
            //Mở đợt hát, dừng spam bot, bắt đầu được dùng s-next
            else if (command_name == "s-startevent"){
                command.execute(message, Event, Song);
                return;
            }
            //Đóng đợt hát, dọn sạch database
            else if (command_name == "s-closeevent"){
                command.execute(message, Song, Event);
                return;
            }
            //Bot thông báo bài kế tiếp, người chơi vote, admin sử dụng s-next để confirm
            else if (command_name == "s-next"){
                command.execute(message, Event, Song);
                return;
            }
            //Bot báo lại danh sách bài hát đã đăng ký
            else if (command_name == "s-listall"){
                command.execute(message, Song);
                return;
            }
            //Báo lại status của bot gồm có event nào đang diễn ra không, có mấy bài trong danh sách, có được đăng ký thêm bài không
            else if (command_name == "s-status"){
                command.execute(message, Event, Song);
                return;
            } 
        }

        //Lệnh cho mọi người
        //Đăng ký bài hát
        if (command_name == "s-sreg"){
            if (args[1]){
                command.execute(message, args[1], Song, Event);
                return;
            }
        }
        //Cách dùng các lệnh
        else if (command_name == "s-help"){
            command.execute(message, client);
            return;
        }
    }
}