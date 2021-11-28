module.exports = {
    name: 'location',
    description: 'Your location is Hanoi!',
    execute(message){
        const data = [];
        data.push('Hello!');

        message.channel.send(data);
    }
}