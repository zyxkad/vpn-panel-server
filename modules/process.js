const events = require('events');
const {showMessage,showVersion} =require('./src/message')
const sender = new events.EventEmitter()

//处理所有发送到服务端的消息
const route = async (message,socket) => {
    switch (message.target) {
        case 'broadcast'://对所有客户端进行消息广播
            sender.emit('broadcast',message.info)
        break

        case 'register':
            //TODO:处理注册事件
        break

        case 'getPSK':
            //TODO:处理从客户端获取到的PSK信息
        break

        case 'userList':
            //TODO:处理从客户端获取到的用户列表
        break

        case 'report':
            //TODO:处理客户端发来的综合报告,需要将其存储到数据库中
        break

        case 'message':
            await showMessage(socket,message)
        break

        case 'getVersion':
            await showVersion(socket,message)
    }

}

module.exports = {
    route,
    sender
}